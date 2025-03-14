import { AIOSessionData } from "./wizardSessionData.js";
import AIOWizardContext from "./aIOWizardContext.js";
declare function start(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes.js").WizardContextWizard<import("telegraf/typings/scenes.js").WizardContext<AIOSessionData>>>;
declare function handleText(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes.js").WizardContextWizard<import("telegraf/typings/scenes.js").WizardContext<AIOSessionData>>>;
declare function done(ctx: any): Promise<any>;
export declare function getPhotoUrlFromWebPage(link: string): Promise<string>;
export interface Dramas {
    slug: string;
    thumb: string;
    mdl_id: string;
    title: string;
    ranking: string;
    type: string;
    year: number;
    series: string;
}
export declare const makeButtons: (items: Dramas[]) => {
    inline_keyboard: any[][];
};
export { start, done, handleText };
