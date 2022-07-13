import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPhotoPixel } from './dto/pexel';
import { IPhoto } from './dto/photo';
import { IPhotoUnsplash } from './dto/unsplash';

@Injectable()
export class SearchService {
  private currentPage: number;
  private unsplashKey = process.env.UNSPLASH_KEY;
  private pexelsKey = process.env.PEXELS_KEY;

  async findAll(params: { search: string; page: number }): Promise<IPhoto[]> {
    this.currentPage = params.page || 1;
    const dataUnsplash = await this.unsplashApi(params.search);
    const dataPexels = await this.pexelsApi(params.search);

    const photos: IPhoto[] = [];

    for (const unsplash of dataUnsplash) {
      photos.push({
        id: unsplash.id,
        origin: 'unsplash',
        description: unsplash.description,
        title: unsplash.alt_description,
        color: unsplash.color,
        urls: {
          full: unsplash.urls.full,
          medium: unsplash.urls.regular,
          small: unsplash.urls.small,
          link: unsplash.links.self,
        },
        userName: unsplash.user.name,
      });
    }

    for (const pexels of dataPexels) {
      photos.push({
        id: String(pexels.id),
        origin: 'pexels',
        description: '',
        title: pexels.alt,
        color: pexels.avg_color,
        urls: {
          full: pexels.src.original,
          medium: pexels.src.medium,
          small: pexels.src.small,
          link: pexels.url,
        },
        userName: pexels.photographer,
      });
    }
    return photos;
  }

  private async unsplashApi(search: string): Promise<IPhotoUnsplash[]> {
    let url = `https://api.unsplash.com/photos?page=${this.currentPage}&client_id=${this.unsplashKey}`;
    if (search)
      url = `https://api.unsplash.com/search/photos?page=${this.currentPage}&client_id=${this.unsplashKey}&query=${search}`;

    const response = await axios.get(url);
    return !search ? response.data : response.data.results;
  }

  private async pexelsApi(search: string): Promise<IPhotoPixel[]> {
    let url = `https://api.pexels.com/v1/search`;
    if (search) url += `?query=${search}&page=${this.currentPage}`;
    url += `&per_page=10`;
    const response = await axios.get(url, {
      headers: {
        Authorization: this.pexelsKey,
      },
    });
    return response.data.photos;
  }
}
