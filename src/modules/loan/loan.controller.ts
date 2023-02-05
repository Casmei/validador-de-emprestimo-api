import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CustomBodyValidationPipe } from 'src/shared/pipes/body-validation.pipe';
import { LoanSimulationDto } from './dto/loan-simulation.dto';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}
  @Post('simulation')
  @UsePipes(new CustomBodyValidationPipe())
  loanSimulation(@Body() data: LoanSimulationDto) {
    return this.loanService.loanSimulate(data);
  }
}
