import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BASE_URL, MAX_SUPPLY } from '../constant';
import { TokenResponseDto } from '../ronda-contract/token.response-dto';
import { RondaContractService } from '../ronda-contract/ronda-contract.service';
import { TokenMetadataResponseDto } from './token-metadata.response-dto';

@Controller('opensea/token')
export class OpenSeaController {
  constructor(private readonly rondaContract: RondaContractService) {}

  @Get(':id')
  async getTokenMetadata(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<TokenMetadataResponseDto> {
    if (id < 0 || id > MAX_SUPPLY) {
      throw new BadRequestException({
        id,
        message: 'Invalid token Id',
      });
    }
    const token = await this.rondaContract.getToken(id);
    return {
      name: this.getName(token),
      description: `Ronda Is a collection of ${MAX_SUPPLY} cards`,
      image: this.getImage(token),
      attributes: [
        { trait_type: 'type', value: this.getCardTypeName(token) },
        { trait_type: 'number', value: this.getCardNumber(token) },
      ],
    };
  }

  private getName(token: TokenResponseDto): string {
    return `${this.getCardNumber(token)} nta3 ${this.getCardTypeName(token)}`;
  }

  private getCardTypeName({ _type }: TokenResponseDto): string {
    const names = {
      '0': 'batos',
      '1': 'copas',
      '2': 'espadas',
      '3': 'oros',
    };
    return names[_type];
  }

  private getCardNumber({ _number }: TokenResponseDto): string {
    const numbers = {
      '0': '1',
      '1': '2',
      '2': '3',
      '3': '4',
      '4': '5',
      '5': '6',
      '6': '7',
      '7': '10',
      '8': '11',
      '9': '12',
    };
    return numbers[_number];
  }

  private getImage(token: TokenResponseDto): string {
    const imagePostfix = parseInt(token._number) + 1;
    const cardType = this.getCardTypeName(token);
    return `${BASE_URL}/${cardType}/${cardType}-${imagePostfix}.jpg`;
  }
}
