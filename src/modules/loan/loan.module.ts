import { Module } from '@nestjs/common';
import { StateModule } from '../state/state.module';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [StateModule],
})
export class LoanModule {}
