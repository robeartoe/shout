
import "https://deno.land/x/dotenv/mod.ts";
import {Application, Router} from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import bodyParser from './body-parser.ts';
import 'https://deno.land/x/dotenv/mod.ts';

const app = new Application();
const PORT = Deno?.env?.get('PORT') ?? 8080;
const router = new Router();

/**
 * Submit text to be shouted
 *
 * @example
 * curl -X POST "https://localhost:8080/" --data '{"text":"TEST"}'
 * https://api.slack.com/interactivity/slash-commands#app_command_handling
 * @param {object} req request object.
 * @param {object} req.body The request payload.
 * @param {string} req.body.text The user's text.
 * @param {object} res response object.
 */
router
    .post('/', async (context) => {
      try {
        // Get the Body:
        const body = context.request.body();
        if (!context.request.hasBody) {
          context.response.status = 400;
          context.response.body = {
            success: false,
            message: 'No data provided',
          };
          return;
        }
        const json = await context.request.body({type: "json"}).value;
        const result = await FetchShoutCloud(json.text! as string);

        context.response.status = 200;
        context.response.type = 'application/json';
        context.response.body = {
          'text': `${result}`,
        };
        return;
      } catch (error) {
        console.error(error);
        context.response.status = 500;
        return;
      }
    });

async function FetchShoutCloud(command: string): Promise<string> {
  const data = await (await fetch('HTTP://API.SHOUTCLOUD.IO/V1/SHOUT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'INPUT': command}),
  })).json();
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

await app.listen({port: Number(PORT)});

export default app;
