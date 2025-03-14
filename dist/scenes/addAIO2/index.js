import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./autoImageFileHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene("add2", on("message", DramaHandlers.start), on("message", DramaHandlers.handleText), on("callback_query", DramaHandlers.done)
// on("message", DramaHandlers.done)
);
export default dramaSession;
