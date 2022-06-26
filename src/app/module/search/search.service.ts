import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
  async findAll(params: { search: string; page: number }) {
    const currentPage = params.page || 1;
    const KEY = process.env.KEY;
    let url = `https://api.unsplash.com/photos?page=${currentPage}&client_id=${KEY}`;
    if (params.search)
      url = `https://api.unsplash.com/search/photos?page=${currentPage}&client_id=${KEY}&query=${params.search}`;
    try {
      const response = await axios.get(url);
      return {
        data: !params.search ? response.data : response.data.results,
        pages: Number(response.headers['x-total']) / 10,
      };
    } catch (error) {
      console.error(error);
    }
  }

}
