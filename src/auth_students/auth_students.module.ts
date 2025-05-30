import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { StudentsModule } from "../students/students.module";
import { AuthStudentsController } from "./auth_students.controller";
import { AuthStudentsService } from "./auth_students.service";

@Module({
	imports: [StudentsModule, JwtModule.register({ global: true })],
	controllers: [AuthStudentsController],
	providers: [AuthStudentsService],
})
export class AuthStudentsModule {}
