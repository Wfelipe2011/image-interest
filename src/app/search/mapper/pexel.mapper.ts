import { IPhotoPixel } from "../dto/pexel.dto";
import { IPhoto } from "../dto/photo.dto";

export class PexelMapper {
    static mapper(dataPexels: IPhotoPixel[]): IPhoto[] {
        const photos: IPhoto[] = [];
        for (const pexels of dataPexels) {
            photos.push({
                id: String(pexels.id),
                origin: 'pexels',
                description: '',
                width: pexels.width,
                height: pexels.height,
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
        return photos
    }
}