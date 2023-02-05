import {
  IsDate,
  IsDateString,
  IsDefined,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class LoanSimulationDto {
  @IsString()
  @Matches(new RegExp('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$'), {
    message: 'cpf format is incorrect',
  })
  @IsDefined()
  cpf: string;

  @IsDefined()
  @IsNumber()
  stateId: number;

  @IsDefined()
  @IsDateString()
  birthDate: Date;

  @IsDefined()
  @IsNumber()
  value: number;

  @IsDefined()
  @IsNumber()
  partialValue: number;
}
