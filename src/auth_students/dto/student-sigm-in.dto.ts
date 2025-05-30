import { IsEmail } from "class-validator";

export class StudentSignInDto {
	@IsEmail({}, { message: "Invalid email" })
	email: string;

	password: string;
}
