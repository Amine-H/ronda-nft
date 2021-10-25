import { Module } from '@nestjs/common';
import { RondaContractModule } from 'src/ronda-contract/ronda-contract';
import { OpenSeaController } from './opensea.controller';

@Module({
  imports: [RondaContractModule],
  controllers: [OpenSeaController],
})
export class OpenseaModule {}
