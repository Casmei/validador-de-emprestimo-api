import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModule } from './modules/loan/loan.module';
import { StateModule } from './modules/state/state.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'loan',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    LoanModule,
    StateModule,
  ],
  controllers: [],
  providers: [LoanModule],
})
export class AppModule {}
