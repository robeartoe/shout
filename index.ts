import NBA from 'nba';
import express from 'express';

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

  } else {
    params = params.split(' ');
  }
  console.log(params);

  res.end(params);

  // Parse Through String:
  if (params.indexOf(' ') !== -1) {
    // If we've got spaces, strip 'em
    params = params.split(' ');
  }
  console.log(params);

  switch (params[0]) {
    case 'team':
      console.log('Team Called:');
      break;
    case 'player':
      console.log('Player Called');
      break;
    default:
      console.log('Incorrect Command!');
      break;
      // res.status(404).send('Incorrect command!');
  }
  // console.log(JSON.parse(data));
  // res.write('Hello World!'); // write a response to the client
  // res.end(); // end the response
}

app.post('/', ball);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Hello world listening on port', port);
});


// const NBA = require('nba');
// import 'nba';
// import * as NBA from 'nba';

// const curry = NBA.findPlayer('Stephen Curry');
// console.log(curry);
/* logs the following:
{
    firstName: 'Stephen',
    lastName: 'Curry',
    playerId: 201939,
    teamId: 1610612744,
    fullName: 'Stephen Curry',
    downcaseName: 'stephen curry'
}
*/
// NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);

// let testPlayer = 'player Kobe Bryant';
// const testTeam = 'team Lakers';


// const Lebron = NBA.findPlayer('Lebron James');
// const Lakers = NBA.teamIdFromName('Lakers');

// console.log(Lebron);
// console.log(Lakers);

// console.log(typeof(Lakers));

// NBA.stats.teamInfoCommon({TeamID: Lakers}).then((res) => {
//     console.log(res['teamInfoCommon'][0]['teamName']);
//     console.log(res['teamInfoCommon'][0]['w']);
//     console.log(res['teamInfoCommon'][0]['l']);
//     console.log(res['teamInfoCommon'][0]['pct']);
//     console.log(res['teamInfoCommon'][0]['confRank']);
//   }
// );
