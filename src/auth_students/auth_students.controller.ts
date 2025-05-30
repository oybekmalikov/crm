import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { AuthStudentsService } from './auth_students.service';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator'
import { StudentSignInDto } from './dto/student-sigm-in.dto'

@Controller('auth-students')
export class AuthStudentsController {
  constructor(private readonly authStudentsService: AuthStudentsService) {}
  @Post("sign-in")
    async signIn(
      @Body() studentSignInDto: StudentSignInDto,
      @Res({ passthrough: true }) res: Response
    ) {
      return this.authStudentsService.signIn(studentSignInDto, res);
    }
    @HttpCode(200)
    @Post("sign-out")
    signOut(
      @CookieGetter("refreshToken") refreshToken: string,
      @Res({ passthrough: true }) res: Response
    ) {
      return this.authStudentsService.signOut(refreshToken, res);
    }
    @HttpCode(200)
    @Get("refresh/:id")
    async updateRefreshToken(
      @Res({ passthrough: true }) res: Response,
      @CookieGetter("refreshToken") refresh_token: string,
      @Param("id", ParseIntPipe) id: number
    ) {
      return this.authStudentsService.updateRefreshToken(id, refresh_token, res);
    }
}
