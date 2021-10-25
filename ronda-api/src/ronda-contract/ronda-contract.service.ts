import { Injectable, OnModuleInit } from '@nestjs/common';
import { CONTRACT_ADDRESS } from '../constant';
import { Contract } from 'web3-eth-contract';
import * as Ronda from './Ronda.json';
import { TokenResponseDto } from './token.response-dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

const network = 'http://localhost:7545';
const contractAddress = CONTRACT_ADDRESS;

@Injectable()
export class RondaContractService implements OnModuleInit {
  private contract: Contract;

  onModuleInit() {
    const web3 = new Web3(new Web3.providers.HttpProvider(network));
    this.contract = new web3.eth.Contract(
      Ronda.abi as any, // ignore this >.<
      contractAddress,
    );
  }

  async getToken(tokenId: number): Promise<TokenResponseDto> {
    return await this.contract.methods.get(tokenId).call();
  }
}
