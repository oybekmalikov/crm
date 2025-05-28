import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
async function start() {
	try {
		const PORT = process.env.PORT || 3030;
		const app = await NestFactory.create(AppModule);
		app.useGlobalPipes(new ValidationPipe());
		app.setGlobalPrefix("api");
		app.use(cookieParser());
		app.enableCors({
			origin: (origin, callback) => {
				const allowedOrigins = [
					"http://localhost:3000",
					"https://localhost:3000",
					"https://private-hospital.uz",
				];
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new BadRequestException("Not allowed by CORS"));
				}
			},
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			credentials: true,
		});
		await app.listen(PORT, () => {
			console.log(`Server started on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
