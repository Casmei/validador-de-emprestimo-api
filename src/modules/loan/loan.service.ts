import { BadRequestException, Injectable } from '@nestjs/common';
import { roundDecimals } from 'src/shared/utils/format-numbers';
import { dataStateMock, State } from './data-state.mock';
import { LoanSimulationDto } from './dto/loan-simulation.dto';

@Injectable()
export class LoanService {
  /**
   * Decidi fazer essa função em português para facilitar o entendimento
   */
  async loanSimulate({ stateId, value, partialValue }: LoanSimulationDto) {
    this.validateLoanSimulate(value, partialValue);
    const { fee } = this.validateStateId(stateId);

    const mes = Math.ceil(value / partialValue) + 1;

    let saldoDevedor = value;
    let jurosTotais = 0;
    const prestacoes = [];

    for (let i = 0; i < mes; i++) {
      // const valorDoJuros = i !== 0 ? saldoDevedor * fee : 0;
      const valorDoJuros = saldoDevedor * fee;

      jurosTotais += valorDoJuros;
      const saldo = saldoDevedor + valorDoJuros;
      const prestacao = roundDecimals(
        saldo > partialValue ? partialValue : saldo,
        2,
      );
      saldoDevedor = saldo - prestacao;
      prestacoes.push({
        mes: i + 1,
        saldo: roundDecimals(saldo, 2),
        prestacao,
        saldoDevedor: roundDecimals(saldoDevedor, 2),
        valorDoJuros: roundDecimals(valorDoJuros, 2),
      });
    }

    const totalLoan = value + jurosTotais;

    return {
      valorTotal: value,
      parcela: partialValue,
      juros: fee,
      mes,
      jurosTotais: roundDecimals(jurosTotais, 2),
      ValorFinalEmprestimo: roundDecimals(totalLoan, 2),
      prestacoes,
    };
  }

  private validateLoanSimulate(value: number, partialValue: number) {
    if (partialValue >= value) {
      throw new BadRequestException(
        'installment amount greater than or equal to loan',
      );
    }

    const isMinValuePortion = partialValue >= value * 0.01;

    if (!isMinValuePortion) {
      throw new BadRequestException('Minimum installment value not reached');
    }
  }

  private validateStateId(stateId: number): State {
    const state = dataStateMock.find((state) => {
      return state.id == stateId;
    });
    if (!state) {
      throw new BadRequestException('Invalid state id');
    }
    return state;
  }
}
