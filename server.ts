import { Application, Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import bodyParser from './body-parser.ts';
import "https://deno.land/x/dotenv/mod.ts";

interface SlackRequest {
  token:string;
  team_id:string;
  team_domain:string;
  enterprise_id:string;
  enterprise_name:string;
  channel_id:string;
  channel_name:string;
  user_id:string;
  user_name:string;
  command: string;
  text:string;
  response_url:string;
  trigger_id:string;
  api_app_id:string;
}

// Import Env Variables:
const app = new Application();

// Router:
const router = new Router();

/**
 * Receive a Slash Command request from Slack.
 *
 * @example
 * curl -X POST "https://shout-vmh6lxa4qa-uw.a.run.app/" --data '{"text":"TEST", ...rest of slack information}'
 * More information on slack information that is sent can be found here:
 * https://api.slack.com/interactivity/slash-commands#app_command_handling
 * @param {object} req Cloud Function request object.
 * @param {object} req.body The request payload.
 * @param {string} req.body.text The user's text.
 * @param {object} res Cloud Function response object.
 */
router
  .post('/', async (context) => {
    try {
      // Get the Body:
      if (!context.request.hasBody) {
        context.response.status = 400;
        context.response.body = {
          success: false,
          message: "No data provided",
        };
        return;
      }
      const {text, user_name}: SlackRequest = await bodyParser(context, ['text', 'user_name', 'team_id', 'channel_name', 'command']);
      const regex = /\+/gi;
      const parsedText = text.split('&')[0].replace(regex, ' ');
      // Call ShoutCloud:
      const result = await FetchShoutCloud(parsedText as string);
      // Respond back to Slack:
      context.response.status = 200;
      context.response.type = 'application/json';
      context.response.body = {
        "response_type": 'in_channel',
        text: `${BuildIntro(user_name)}${result}`
      };
      return;
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      return;
    }
  })

  function BuildIntro(user_name: string): string {
    function GetRandomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const intros: string[] = [
      `Umm, did you hear? ${user_name} just said.. `,
      `What part didn't you understand? ${user_name} is trying to say.. `,
      `DID ${user_name.toUpperCase()} STUTTER? ${user_name.toUpperCase()} SAID `,
      `${user_name} just said `,
      `What ${user_name} is trying to say is `
    ] 
    return intros[GetRandomInt(intros.length)];
  }

async function FetchShoutCloud(command: string): Promise<string> {
  const data = await (await fetch("HTTP://API.SHOUTCLOUD.IO/V1/SHOUT", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"INPUT": command})
  })).json()
  return data.OUTPUT;
}


app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({hostname, port, secure}) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
})

export default app;
