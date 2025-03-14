import { AIOSessionData } from "./wizardSessionData.js";
import AIOWizardContext from "./aIOWizardContext.js";
declare function start(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes.js").WizardContextWizard<import("telegraf/typings/scenes.js").WizardContext<AIOSessionData>>>;
declare function poster(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes.js").WizardContextWizard<import("telegraf/typings/scenes.js").WizardContext<AIOSessionData>>>;
declare function done(ctx: AIOWizardContext): Promise<void>;
export declare function getPhotoUrlFromWebPage(link: string): Promise<string>;
export { start, poster, done };
