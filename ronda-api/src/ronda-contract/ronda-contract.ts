import { Module } from '@nestjs/common';
import { RondaContractService } from './ronda-contract.service';

@Module({
  providers: [RondaContractService],
  exports: [RondaContractService],
})
export class RondaContractModule {}
