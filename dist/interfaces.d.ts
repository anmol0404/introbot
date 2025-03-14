import { NarrowedContext } from "telegraf";
import { Update, Message, User } from "telegraf/typings/core/types/typegram.js";
import { WizardContext, WizardSessionData } from "telegraf/typings/scenes/index.js";
import { IntroDocument } from "./databases/interfaces/Intro.js";
export type CommandContext = NarrowedContext<WizardContext<WizardSessionData>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>;
export interface DatabaseClient {
    initialize(): Promise<void>;
    getIntroMessages(shareId: number): Promise<number | undefined>;
    saveUser(user: User): Promise<User>;
    saveIntro(aIODocument: IntroDocument): Promise<IntroDocument>;
    deleteIntro(shareId: number): any;
    updateIntroAttribute(shareId: number, attribute: any): any;
}
export interface RequestDBClient {
    initialize(): Promise<void>;
    hasReachedRequestLimit(userId: string): any;
    addUserRequest(userId: string): any;
    saveRequestData(userId: string): any;
}
