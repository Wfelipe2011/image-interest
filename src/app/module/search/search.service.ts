import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
  private currentPage: number;
  private unsplashKey = process.env.UNSPLASH_KEY;
  private pexelsKey = process.env.PEXELS_KEY;
  async findAll(params: { search: string; page: number }) {
    this.currentPage = params.page || 1;
    const dataUnsplash = await this.unsplashApi(params.search);
    const dataPexels = await this.pexelsApi(params.search);
    return {
      data: [dataPexels, dataUnsplash],
    };
  }

  private async unsplashApi(search: string) {
    let url = `https://api.unsplash.com/photos?page=${this.currentPage}&client_id=${this.unsplashKey}`;
    if (search)
      url = `https://api.unsplash.com/search/photos?page=${this.currentPage}&client_id=${this.unsplashKey}&query=${search}`;

    const response = await axios.get(url);
    return !search ? response.data : response.data.results;
  }

  private async pexelsApi(search: string) {
    let url = `https://api.pexels.com/v1/search`;
    if (search) url += `?query=${search}&page=${this.currentPage}`;
    url += `&per_page=10`;
    const response = await axios.get(url, {
      headers: {
        Authorization: this.pexelsKey,
      },
    });
    console.log(response);

    return response.data.photos;
  }
}
