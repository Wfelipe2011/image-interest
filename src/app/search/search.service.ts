import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPhotoPixel } from './dto/pexel.dto';
import { IPhoto } from './dto/photo.dto';
import { IPhotoUnsplash } from './dto/unsplash.dto';
import { shuffle } from './entities/shuffle.entity';
import { PexelMapper } from './mapper/pexel.mapper';
import { UnsplashMapper } from './mapper/unsplash.mapper';
import { logger } from 'skyot';
@Injectable()
export class SearchService {
  private currentPage: number;
  private unsplashKey = process.env.UNSPLASH_KEY;
  private pexelsKey = process.env.PEXELS_KEY;

  async findAll(params: { search: string; page: number }): Promise<IPhoto[]> {
    this.currentPage = params.page || 1;
    const dataUnsplash = await this.unsplashApi(params.search);
    const dataPexels = await this.pexelsApi(params.search);
    const photos = PexelMapper.mapper(dataPexels).concat(UnsplashMapper.mapper(dataUnsplash))
    return shuffle<IPhoto>(photos);
  }

  private async unsplashApi(search: string): Promise<IPhotoUnsplash[]> {
    try {
      let url = `https://api.unsplash.com/photos?page=${this.currentPage}&client_id=${this.unsplashKey}`;
      if (search)
        url = `https://api.unsplash.com/search/photos?page=${this.currentPage}&client_id=${this.unsplashKey}&query=${search}`;

      const response = await axios.get(url);
      return !search ? response.data : response.data.results;
    } catch (error) {
      logger(error)
      return []
    }

  }

  private async pexelsApi(search: string): Promise<IPhotoPixel[]> {
    try {
      let url = `https://api.pexels.com/v1/search`;
      if (search) url += `?query=${search}&page=${this.currentPage}`;
      url += `&per_page=10`;
      const response = await axios.get(url, {
        headers: {
          Authorization: this.pexelsKey,
        },
      });
      return response.data.photos;
    } catch (error) {
      logger(error)
      return []
    }

  }

}

