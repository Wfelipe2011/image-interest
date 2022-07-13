/* eslint-disable prettier/prettier */
export interface Source {
    ancestry: Ancestry;
    title: string;
    subtitle: string;
    description: string;
    meta_title: string;
    meta_description: string;
    cover_photo: IPhotoUnsplash;
}

export interface Tag {
    type: string;
    title: string;
    source: Source;
}

export interface IPhotoUnsplash {
    id: string;
    created_at: Date;
    updated_at: Date;
    promoted_at: Date;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    urls: Urls;
    links: IUnsplashLinks;
    categories: any[];
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    user: User;
    tags?: Tag[];
}

export interface Ancestry {
    type: Category;
    category: Category;
    subcategory: Category;
}

export interface Category {
    slug: string;
    pretty_slug: string;
}

export interface IUnsplashLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}

export interface User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: null;
    portfolio_url: string;
    bio: null;
    location: string;
    links: UserLinks;
    profile_image: ProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: Social;
}

export interface UserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface Social {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: null;
    paypal_email: null;
}
