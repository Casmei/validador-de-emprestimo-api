import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
  imports: [TypeOrmModule.forFeature([State])],
})
export class StateModule {}
