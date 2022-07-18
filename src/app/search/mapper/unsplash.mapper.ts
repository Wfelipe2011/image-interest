import { IPhoto } from "../dto/photo.dto";
import { IPhotoUnsplash } from "../dto/unsplash.dto";


export class UnsplashMapper {
    static mapper(dataUnsplash: IPhotoUnsplash[]): IPhoto[] {
        const photos: IPhoto[] = [];
        for (const unsplash of dataUnsplash) {
            photos.push({
                id: unsplash.id,
                origin: 'unsplash',
                description: unsplash.description,
                width: unsplash.width,
                height: unsplash.height,
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
        return photos
    }
}