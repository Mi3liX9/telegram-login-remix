import type { TgLoginData, TgAuthOptions, TgLogin } from "./types";

declare global {
  var Telegram: {
    Login: TgLogin;
  };
}

interface TgOptions extends Omit<TgAuthOptions, "bot_id"> {}
/**
 * Auth helper function for Telegram If you want to use native auth you can use
 * window.Telegram.Login.auth.
 *
 * Note: This function runs in the browser only.
 * @param botId provide the bot id from BotFather, Note: don't include your bot
 * secret.
 * @param options control request_access and lang options.
 * @returns
 */
export function auth(botId: string, options?: TgOptions) {
  if (typeof document === "undefined") {
    throw new Error("Telegram auth can only be run in the browser.");
  }

  return new Promise<TgLoginData>((resolve, reject) => {
    window.Telegram.Login.auth({ bot_id: botId, ...options }, (data) => {
      if (!data) {
        reject("User rejected auth request.");
      }
      resolve(data as TgLoginData);
    });
  });
}

export { checkSignature } from "@grammyjs/validator";
