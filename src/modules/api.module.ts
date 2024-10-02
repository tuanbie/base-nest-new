import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [UserModule, AuthModule, FilesModule, HistoryModule],
})
export class ApiModule {}
