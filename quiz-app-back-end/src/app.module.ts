import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    QuizModule,
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(){
    console.log(process.env.MONGO_URI);
    
  }
}