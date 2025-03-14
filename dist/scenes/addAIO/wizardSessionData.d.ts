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
}
