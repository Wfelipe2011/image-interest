import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SearchModule } from './module/search/search.module';
@Module({
  imports: [DatabaseModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
