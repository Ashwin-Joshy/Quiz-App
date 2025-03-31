import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schema/user';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from 'src/user/jwtAuthGuard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('create-user')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Post('login-user')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        return { message: 'Welcome!', user: req.user };
    }
}
