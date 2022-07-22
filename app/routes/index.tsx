import {
  type ActionFunction,
  type LoaderFunction,
  json,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Bot } from "grammy";
import { useState } from "react";
import type { TgLoginData } from "~/tg-utils/types";
import { auth } from "../tg-utils";

interface LoaderType {
  bot_id: string;
}

export const loader: LoaderFunction = async () => {
  const bot_id = process.env.BOT_ID; // Put your bot id here

  if (typeof bot_id === "undefined") {
    throw new Error("bot_id is not defined");
  }
  return json<LoaderType>({
    bot_id,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const bot_id = process.env.BOT_ID; // Put your bot id here

  if (typeof bot_id === "undefined") {
    throw new Error("bot_id is not defined");
  }

  const formData = await request.formData(); // Get the form data
  const user: TgLoginData = JSON.parse(formData.get("user") as string);

  const message = `Hello, ${user.first_name}! You are logged in as ${user.username}`;
  const bot = new Bot(bot_id); // create new bot instance
  await bot.api.sendMessage(user.id, message); // send message to user

  return json({});
};

export default function Index() {
  const { bot_id } = useLoaderData<LoaderType>();
  const fetcher = useFetcher();
  const [user, setUser] = useState<TgLoginData | undefined>(undefined);

  async function loginByTelegram() {
    const data = await auth(bot_id, { request_access: true });
    setUser(data);
    fetcher.submit({ user: JSON.stringify(data) }, { method: "post" });
  }
  if (!user) {
    return (
      <div>
        User is not logged in <button onClick={loginByTelegram}>login</button>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#eee", padding: "10px" }}>
      <h1>Hello, {user.first_name}!</h1>
      <img src={user.photo_url} alt={user.username} />
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </div>
  );
}
