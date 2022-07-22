export interface TgLogin {
  widgetsOrigin: "https://oauth.telegram.org";
  /**
   * Headless function to authnticate users from Telegram
   */
  auth(
    options: TgAuthOptions,
    callback?: (dataOrFalse: TgLoginData | false) => void
  ): void;
}

export interface TgAuthOptions {
  /**
   * Bot Id of the bot to authenticate with, you can get this from BotFather
   * https://t.me/BotFather
   */
  bot_id: string;
  /**
   * Request if the bot can send messages to the user
   */
  request_access?: boolean;
  lang?: string;
}

export interface TgLoginData {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  username: string;
  photo_url: string;
}
