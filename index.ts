import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';
// Import Env Variables:
// const { PORT } = config();

const app = new Application();

app.addEventListener("listen", ({hostname, port, secure}) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
})

// TODO: Verify Webhook:

// TODO: Post to Slack:

// TODO: Get Information:

// TODO: Router:
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
    const result = await FetchShoutCloud("test");
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

await app.listen({ port: 8000  });
