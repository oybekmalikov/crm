import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsModule } from "./admins/admins.module";
import { AuthAdminsModule } from "./auth_admins/auth_admins.module";
import { AuthTeachersModule } from './auth_teachers/auth_teachers.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { AuthStudentsModule } from './auth_students/auth_students.module';
import { CoursesModule } from './courses/courses.module';
import { TeacherGroupsModule } from './teacher_groups/teacher_groups.module';
import { StudentGroupsModule } from './student_groups/student_groups.module';
import { GroupsModule } from './groups/groups.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SchedulesModule } from './schedules/schedules.module';
@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				type: config.get<"postgres">("DB_CONNECTION"),
				host: config.get<string>("DB_HOST"),
				username: config.get<string>("DB_USERNAME"),
				password: config.get<string>("DB_PASSWORD"),
				port: config.get<number>("DB_PORT"),
				database: config.get<string>("DB_NAME"),
				entities: [__dirname + "dist/**/*.entitiy{.ts,.js}"],
				synchronize: true,
				autoLoadEntities: true,
				logging: false,
			}),
		}),
		AdminsModule,
		AuthAdminsModule,
		AuthTeachersModule,
		TeachersModule,
		StudentsModule,
		AuthStudentsModule,
		CoursesModule,
		TeacherGroupsModule,
		StudentGroupsModule,
		GroupsModule,
		AttendancesModule,
		SchedulesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
