import { createRequire } from "https://deno.land/std@v0.53.0/node/module.ts";

const require = createRequire(import.meta.url);
const express = require('express');

// const express = require('express');
const app = express();

// TODO: Verify Webhook:

// TODO: Post to Slack:

// TODO: Get Information:


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
function ball(req: any, res: any): any {
  let params = req.body.params;
  if (params === undefined) {

  }
  console.log(params);
  res.end(params);
}

app.post('/', ball);

const port = 8080;
app.listen(port, () => {
  console.log('Sloud Function is Listening on port', port);
});
