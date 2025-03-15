import { CommandContext } from "../../interfaces.js";
import database from "../../services/database.js";

export default async function startHandler(ctx: CommandContext) {
  const userId = ctx.from?.id;
  try {
    await database.saveUser(ctx.from);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
  await ctx.reply(
    "Hello " +
      ctx.from?.first_name +
      "!\nUse /addmyintro to add your intro.\nUse /deletemyintro to delete your intro."
  );
}
