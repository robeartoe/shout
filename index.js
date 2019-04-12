const http = require('http');

// create a server object:
const server = http.createServer(function(req, res) {
  const NBA = require('nba');

  // console.log(req.body);
  // let params = req.body.text;

  req.on('data', (data) => {
    const param = JSON.parse(data);
    let params = param['params'];

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
    res.write('Hello World!'); // write a response to the client
    res.end(); // end the response
  });
}); // the server object listens on port 8080

const hostname = 'localhost';
const port = 8080;

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
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
