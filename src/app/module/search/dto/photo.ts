/* eslint-disable prettier/prettier */
interface IUrls {
    full: string;
    medium: string;
    small: string;
    link: string;
}

export interface IPhoto {
    description: string;
    title: string
    id: string;
    color: string
    urls: IUrls;
    userName: string;
    origin: string
}