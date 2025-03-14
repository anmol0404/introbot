import { WizardSessionData } from "telegraf/typings/scenes";
export interface AIOSessionData extends WizardSessionData {
    fullName?: string;
    from?: string;
    age?: string;
    bio?: string;
    language?: string;
    knownLanguages?: string[];
    skills?: string[];
    hobbies?: string[];
    study?: string;
    profession?: string;
    bgImage?: string;
    mainImage?: boolean;
}
