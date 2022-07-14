import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get()
  async findAll(@Query() params: { search: string; page: number }) {
    return await this.searchService.findAll(params);
  }
}
