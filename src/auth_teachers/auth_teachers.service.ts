import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Teacher } from "../teachers/entities/teacher.entity";
import { TeachersService } from "../teachers/teachers.service";
import { TeacherSignInDto } from "./dto/teacher-sign-in.dto";
@Injectable()
export class AuthteachersService {
	constructor(
		private readonly teacherService: TeachersService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(teacher: Teacher) {
		const payload = {
			id: teacher.id,
			isActive: teacher.is_active,
			roles: teacher.role,
		};
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: process.env.ACCESS_TOKEN_KEY,
				expiresIn: process.env.ACCESS_TOKEN_TIME,
			}),
			this.jwtService.signAsync(payload, {
				secret: process.env.REFRESH_TOKEN_KEY,
				expiresIn: process.env.REFRESH_TOKEN_TIME,
			}),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}
	async signIn(teacherSignInDto: TeacherSignInDto, res: Response) {
		const teacher = await this.teacherService.findByEmail(
			teacherSignInDto.email
		);
		if (!teacher) {
			throw new BadRequestException("Invalid email or password");
		}
		if (!teacher.is_active) {
			throw new UnauthorizedException("Please, activate your account!");
		}
		const validPassword = await bcrypt.compare(
			teacherSignInDto.password,
			teacher.password
		);
		if (!validPassword) {
			throw new BadRequestException("Invalid email or password");
		}
		const { accessToken, refreshToken } = await this.generateTokens(teacher);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		teacher.refresh_token = await bcrypt.hash(refreshToken, 7);

		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		teacherId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedRefreshToken = await this.jwtService.decode(refresh_token);
		if (teacherId !== decodedRefreshToken["id"]) {
			throw new ForbiddenException("Not Allowed");
		}
		const teacher = await this.teacherService.findOne(teacherId);
		if (!teacher || !teacher.refresh_token) {
			throw new NotFoundException("teacher not found");
		}
		const tokenMatch = await bcrypt.compare(
			refresh_token,
			teacher.refresh_token
		);
		if (!tokenMatch) {
			throw new ForbiddenException("Forbidden!");
		}
		const { accessToken, refreshToken } = await this.generateTokens(teacher);
		const hashshedRefreshToken = await bcrypt.hash(refreshToken, 7);
		await this.teacherService.updateRefreshToken(
			teacherId,
			hashshedRefreshToken
		);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		return {
			message: "teacher Refresh Token updated",
			id: teacherId,
			accessToken,
		};
	}
	async signOut(refreshToken: string, res: Response) {
		const teacherData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!teacherData) {
			throw new ForbiddenException("teacher not verified!");
		}
		this.teacherService.updateRefreshToken(teacherData.id, null!);
		res.clearCookie("refreshToken");
		return {
			message: "teacher logged out",
		};
	}
}
