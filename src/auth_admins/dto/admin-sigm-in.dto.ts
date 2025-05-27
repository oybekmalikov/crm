import { IsEmail } from "class-validator";

export class AdminSignInDto {
	@IsEmail({}, { message: "Invalid email" })
	email: string;

	password: string;
}
