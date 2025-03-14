import { WizardContext } from "telegraf/typings/scenes";
import database from "../../services/database.js";

export default async function autoReactHandler(ctx: WizardContext): Promise<void> {
  try {
    const userId = ctx.from?.id;
    const userName = ctx.from?.username || ctx.from?.first_name || "Unknown User";

    if (!userId) return;
    const result = await database.deleteIntro(userId);
    if (!result) {
      await ctx.reply(`No intro found for ${userName} add your intro using /addmyintro`);
      return;
    }
    await ctx.reply(`Deleted intro  for ${userName} successfully`);
  } catch (error) {
    console.error("Error in autoReactHandler:", error);
    await ctx.reply("An unexpected error occurred. Please try again later.");
  }
}
