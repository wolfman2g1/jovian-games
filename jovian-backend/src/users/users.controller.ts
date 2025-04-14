import { Controller, Post,Body } from '@nestjs/common';
import { SignUpDto } from './dto';
import { UserService } from './user.service';
    
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('signup')
    async signUp(@Body() signup: SignUpDto) {
        return this.userService.signup(signup); 

    }
}