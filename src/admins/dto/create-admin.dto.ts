import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Matches,
} from "class-validator";

export class CreateAdminDto {
	@IsString({ message: "full_name type must be string" })
	@IsNotEmpty({ message: "full_name must entered" })
	full_name: string;
	@IsEmail({}, { message: "Invalid email" })
	email: string;
	@IsStrongPassword({}, { message: "Password must be strong!" })
	password: string;
	@Matches(/^\+998[0-9]{9}$/, {
		message: "Invalid phone number",
	})
	phone: string;
	@IsBoolean({ message: "Admins activity must be boolean" })
	is_active: boolean;
	@IsBoolean({ message: "Admins creativity must be boolean" })
	is_creator: boolean;
}
