import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./introHandler.js";

const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "intro",
  Composer.on("message", DramaHandlers.start),
  Composer.on("message", DramaHandlers.handleFullName),
  Composer.on("message", DramaHandlers.handleLocation),
  Composer.on("message", DramaHandlers.handleAge),
  Composer.on("message", DramaHandlers.handleProfession),
  Composer.on("message", DramaHandlers.handleStudy),
  Composer.on("message", DramaHandlers.handleBio),
  Composer.on("message", DramaHandlers.handleBgImg),
  Composer.on("message", DramaHandlers.handleMainImg)

  // Composer.on("message", DramaHandlers.handleSkills)
);

export default dramaSession;
