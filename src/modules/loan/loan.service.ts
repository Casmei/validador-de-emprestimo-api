import { BadRequestException, Injectable } from '@nestjs/common';
import { roundDecimals } from 'src/shared/utils/format-numbers';
import { LoanSimulationDto } from './dto/loan-simulation.dto';

@Injectable()
export class LoanService {
  async loanSimulate({ value, partialValue }: LoanSimulationDto) {
    this.validateLoanSimulate(value, partialValue);
    const fee = 0.1;
    const month = Math.ceil(value / partialValue) + 1;

    let valueSeed = value;
    let totalInterest = 0;
    const installments = [];

    for (let i = 0; i < month; i++) {
      const interest = valueSeed * fee;
      totalInterest += interest;
      const balance = valueSeed + interest;
      const installment = roundDecimals(
        balance > partialValue ? partialValue : balance,
        2,
      );
      valueSeed = balance - installment;

      installments.push({
        debitBalance: roundDecimals(valueSeed, 2),
        interestPerMonth: roundDecimals(interest, 2),
        debitBalanceAdjusted: roundDecimals(balance, 2),
        installmentValue: installment,
      });
    }

    const totalLoan = value + totalInterest;

    return {
      value,
      partialValue,
      fee,
      month,
      totalInterest: roundDecimals(totalInterest, 2),
      totalLoan: roundDecimals(totalLoan, 2),
      installments,
    };
  }

  private validateLoanSimulate(value: number, partialValue: number) {
    if (partialValue >= value) {
      throw new BadRequestException(
        'installment amount greater than or equal to loan',
      );
    }

    // const isMinValue = value >= 5000;

    // if (!isMinValue) {
    //   throw new BadRequestException('Minimum loan amount not reached');
    // }

    const isMinValuePortion = partialValue >= value * 0.01;

    if (!isMinValuePortion) {
      throw new BadRequestException('Minimum installment value not reached');
    }
  }
}
