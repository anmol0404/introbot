import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./autoImageFileHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene("add", on("message", DramaHandlers.start), on("message", DramaHandlers.poster), on("message", DramaHandlers.done));
export default dramaSession;
