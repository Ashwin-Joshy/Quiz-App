import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schema/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('create-user')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    // @Post('login')
    // async login(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     return this.userService.login(createUserDto);
    // }
}
