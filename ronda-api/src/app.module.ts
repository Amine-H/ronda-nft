import { Module } from '@nestjs/common';
import { OpenseaModule } from './opensea/opensea.module';

@Module({
  imports: [OpenseaModule],
})
export class AppModule {}
