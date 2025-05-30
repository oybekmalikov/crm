import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Student } from "../students/entities/student.entity";
import { StudentsService } from "../students/students.service";
import { StudentSignInDto } from './dto/student-sigm-in.dto'
import * as bcrypt from "bcrypt"
import { Response } from 'express'
@Injectable()
export class AuthStudentsService {
	constructor(
		private readonly studentsService: StudentsService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(student: Student) {
		const payload = {
			id: student.id,
			isActive: student.is_active,
			roles: ["student"],
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
	async signIn(studentSignInDto: StudentSignInDto, res: Response) {
		const student = await this.studentsService.findByEmail(
			studentSignInDto.email
		);
		if (!student) {
			throw new BadRequestException("Invalid email or password");
		}
		if (!student.is_active) {
			throw new UnauthorizedException("Please, activate your account!");
		}
		const validPassword = await bcrypt.compare(
			studentSignInDto.password,
			student.password
		);
		if (!validPassword) {
			throw new BadRequestException("Invalid email or password");
		}
		const { accessToken, refreshToken } = await this.generateTokens(student);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		student.refresh_token = await bcrypt.hash(refreshToken, 7);
		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		studentId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedRefreshToken = await this.jwtService.decode(refresh_token);
		if (studentId !== decodedRefreshToken["id"]) {
			throw new ForbiddenException("Not Allowed");
		}
		const student = await this.studentsService.findOne(studentId);
		if (!student || !student.refresh_token) {
			throw new NotFoundException("Student not found");
		}
		const tokenMatch = await bcrypt.compare(
			refresh_token,
			student.refresh_token
		);
		if (!tokenMatch) {
			throw new ForbiddenException("Forbidden!");
		}
		const { accessToken, refreshToken } = await this.generateTokens(student);
		const hashshedRefreshToken = await bcrypt.hash(refreshToken, 7);
		await this.studentsService.updateRefreshToken(
			studentId,
			hashshedRefreshToken
		);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		return {
			message: "Student Refresh Token updated",
			id: studentId,
			accessToken,
		};
	}
	async signOut(refreshToken: string, res: Response) {
		const studentData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!studentData) {
			throw new ForbiddenException("Student not verified!");
		}
		this.studentsService.updateRefreshToken(studentData.id, null!);
		res.clearCookie("refreshToken");
		return {
			message: "Student logged out",
		};
	}
}
