import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { HistoryModule } from './history/history.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, AuthModule, FilesModule, HistoryModule, BookingModule],
})
export class ApiModule {}
