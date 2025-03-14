export interface Link {
    episode: number;
    shortUrl: string;
    teleUrl: string;
}
export interface AIODocument {
    shareId: number;
    messageIds: number[];
    title: string;
    type: "Anime" | "Movie" | "Drama" | "Series" | "Manga" | "Other";
    detail: string;
    posterUrl: string;
    shortUrl: string;
    director: string;
    screenwriter: string;
    aired: string;
    duration: string;
    episodes: Link[];
    totalEpisodes: number;
    tags: string;
    plot: string;
    country: string;
    screenshots?: string[];
    quality?: string[];
    relatedContent?: string[];
    genres?: string[];
    rating?: number;
    year?: number;
    status?: "Ongoing" | "Completed" | "Upcoming";
    trailerUrl?: string;
    languages?: string[];
    subtitles?: string[];
}
