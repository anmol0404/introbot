import { WizardSessionData } from "telegraf/typings/scenes";
export interface AIOSessionData extends WizardSessionData {
    aIOTitle?: string;
    backupChannel?: string;
    file?: string;
    messageIds?: number[];
    aIOPosterID?: string;
    done?: boolean;
    posterDone?: boolean;
    captions?: string[];
    sentBy?: number;
    data?: any;
    allData?: Drama;
}
export interface Drama {
    title: string;
    year: number;
    relatedContent: string[];
    alsoKnownAs: string[];
    genres: string[];
    country: string;
    type: string;
    episodes: number;
    aired: string;
    release_date?: string;
    duration: string;
    director: string;
    screenwriter: string;
    score: number;
    contentRating: string;
    plot: string;
    whereToWatch: {
        platform: string;
        type: string;
    }[];
}
