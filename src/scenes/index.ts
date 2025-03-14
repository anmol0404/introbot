import { Scenes } from "telegraf";

import shareAIO from "./intro/index.js";

const stage = new Scenes.Stage<Scenes.WizardContext>([shareAIO]);

export default stage;
