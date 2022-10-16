
import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule , forwardRef(() => AuthModule)],
  providers: [
    ...userProviders,
    UserService
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}