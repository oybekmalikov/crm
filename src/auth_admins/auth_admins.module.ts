import { Module } from "@nestjs/common";
import { AuthAdminsController } from "./auth_admins.controller";
import { AuthAdminsService } from "./auth_admins.service";
import { AdminsModule } from '../admins/admins.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [AdminsModule, JwtModule.register({ global: true })],
	controllers: [AuthAdminsController],
	providers: [AuthAdminsService],
})
export class AuthAdminsModule {}
