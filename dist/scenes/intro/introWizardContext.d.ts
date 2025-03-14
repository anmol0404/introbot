import { NarrowedContext, Scenes } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { AIOSessionData } from "./wizardSessionData";
type DramaWizardContext = NarrowedContext<Scenes.WizardContext<AIOSessionData>, Update.MessageUpdate<Message>>;
export default DramaWizardContext;
