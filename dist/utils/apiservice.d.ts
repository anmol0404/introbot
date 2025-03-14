export interface DramaSearchResult {
    dramas: Drama[];
    people: Person[];
}
export interface Result {
    results: DramaSearchResult;
}
export interface Drama {
    slug: string;
    thumb: string;
    mdl_id: string;
    title: string;
    ranking: string;
    type: string;
    year: number;
    series: string;
}
export interface Person {
    slug: string;
    thumb: string;
    name: string;
    nationality: string;
}
export interface DramaInfo {
    link: string;
    title: string;
    complete_title: string;
    rating: number;
    poster: string;
    synopsis: string;
    casts: Cast[];
    details: DramaDetails;
    others: AdditionalInfo;
}
export interface DramaData {
    data: DramaInfo;
}
export interface Cast {
    name: string;
    profile_image: string;
    slug: string;
    link: string;
}
export interface DramaDetails {
    country: string;
    type: string;
    episodes: string;
    aired: string;
    aired_on: string;
    release_date?: string;
    original_network: string;
    duration: string;
    score: string;
    ranked: string;
    popularity: string;
    content_rating: string;
    watchers: string;
    favorites: string;
}
export interface AdditionalInfo {
    native_title: string[];
    related_content?: string[];
    also_known_as: string[];
    screenwriter: string[];
    director: string[];
    genres: string[];
    tags: string[];
}
export interface SeasonalDrama {
    year: number;
    quarter: number;
    dramas: Drama[];
}
export interface List {
    id: string;
    title: string;
    dramas: Drama[];
}
export interface UserDramalist {
    user_id: string;
    list: Drama[];
}
export declare const searchDramas: (query: string) => Promise<Result>;
export declare const getDramaInfo: (slug: string) => Promise<DramaData>;
export declare const getDramaCast: (slug: string) => Promise<Cast[]>;
export declare const getDramaReviews: (slug: string) => Promise<any>;
export declare const getPersonInfo: (personId: string) => Promise<Person>;
export declare const getSeasonalDramas: (year: number, quarter: number) => Promise<SeasonalDrama>;
export declare const getList: (listId: string) => Promise<List>;
export declare const getUserDramalist: (userId: string) => Promise<UserDramalist>;
