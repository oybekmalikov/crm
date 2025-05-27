import { IsEmail } from "class-validator";

export class TeacherSignInDto {
	@IsEmail({}, { message: "Invalid email" })
	email: string;
	password: string;
}
