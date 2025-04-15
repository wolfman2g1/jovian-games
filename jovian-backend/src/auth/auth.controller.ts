import { Controller, Post,Body, HttpCode } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
    
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @HttpCode(201)
    @Post('signup')
    async signUp(@Body() signup: SignUpDto) {
        return this.authService.signup(signup); 

    }
    @HttpCode(200)
    @Post('login')
    async login(@Body() login: LoginDto) {
        const loginUser = await this.authService.login(login);
        if (loginUser) {
            return {
                message: 'Login successful',
                user: loginUser,};
        }
        // If login fails, you can return an appropriate response
        return { message: 'Invalid credentials' };
     }
}