import { Context } from "telegraf";

export default {
  private(ctx: Context, next: () => void) {
    next();
  },
};
