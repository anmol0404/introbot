import { WizardContext } from "telegraf/typings/scenes";

export default async function addAIOHandler(ctx: WizardContext) {
  const userId = ctx.from?.id;
  await await ctx.scene.enter("intro");
}
