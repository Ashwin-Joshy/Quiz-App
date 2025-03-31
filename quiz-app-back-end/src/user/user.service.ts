import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name, phone, image } = createUserDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash the password before storing
        //const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password; // For simplicity, we are not hashing the password here

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            name,
            phone,
            image,
            createdDate: new Date(),
            updatedDate: new Date()
        });

        return newUser.save();
    }
}
