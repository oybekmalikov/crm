import { Controller } from "@nestjs/common";
import { AuthTeachersService } from "./auth_teachers.service";

@Controller("auth-teachers")
export class AuthTeachersController {
	constructor(private readonly authTeachersService: AuthTeachersService) {}
}
