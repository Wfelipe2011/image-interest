/* eslint-disable prettier/prettier */
export interface IPhotoPixel {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographerURL: string;
    photographerID: number;
    avgColor: string;
    src: Src;
    liked: boolean;
    alt: string;
}

interface Src {
    original: string;
    large2X: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export class PhotoPixel {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographerURL: string;
    photographerID: number;
    avgColor: string;
    src: Src;
    liked: boolean;
    alt: string;

    constructor(photoPixel: IPhotoPixel) {
        this.id = photoPixel.id;
        this.width = photoPixel.width;
        this.height = photoPixel.height;
        this.url = photoPixel.url;
        this.photographer = photoPixel.photographer;
        this.photographerURL = photoPixel.photographerURL;
        this.photographerID = photoPixel.photographerID;
        this.avgColor = photoPixel.avgColor;
        this.src = photoPixel.src;
        this.liked = photoPixel.liked;
        this.alt = photoPixel.alt;
    }
}
