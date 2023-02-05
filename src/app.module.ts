import { Module } from '@nestjs/common';
import { LoanModule } from './modules/loan/loan.module';
@Module({
  imports: [LoanModule],
  controllers: [],
  providers: [LoanModule],
})
export class AppModule {}
