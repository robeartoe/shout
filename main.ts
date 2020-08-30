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
const PORT = Deno?.env?.get('PORT') ?? 8080;
const app = new Application();

// Router:
const router = new Router();

/**
 * Receive a Slash Command request from Slack.
 *
 * Trigger this function by making a POST request with a payload to:
 * https://[YOUR_REGION].[YOUR_PROJECT_ID].cloudfunctions.net/kgsearch
 *
 * @example
 * curl -X POST "https://us-central1.your-project-id.cloudfunctions.net/kgSearch" --data '{"token":"[YOUR_SLACK_TOKEN]","text":"giraffe"}'
 *
 * @param {object} req Cloud Function request object.
 * @param {object} req.body The request payload.
 * @param {string} req.body.token Slack's verification token.
 * @param {string} req.body.text The user's search query.
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
      const {
        text = '',
      }: SlackRequest = await bodyParser(context, ['text']);
      const regex = /\+/gi;
      const parsedText = text.split('&')[0].replace(regex, ' ');
      // Call ShoutCloud:
      const result = await FetchShoutCloud(parsedText as string);
      // Respond back to Slack:
      context.response.status = 200;
      context.response.type = 'application/json';
      context.response.body = {
        "response_type": 'in_channel',
        text: result
      };
      return;
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      return;
    }
  })
  .get('/', async (context) => {
    const result = await FetchShoutCloud("test");
    context.response.body = result;    
  })

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

await app.listen({ port: Number(PORT)  });
