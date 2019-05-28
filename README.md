# Ball:
Ball is a slack command written in node, made to get information on teams, players, division standings, and scores.

## Installation:
Clone this repository
```bash 
git clone https://github.com/robeartoe/ball.git
```
Using the config.default.json file as a template, make a config.json file with your slack token:
```
{
    "SLACK_TOKEN" : "YOUR_SLACK_TOKEN"
}
```

## Development:
You can setup a local functions instance by using the command:
```bash
npm start
```
Make sure functions-framework is installed.

Afterwards you can send request to that function instance.
You can send the commands 
```
{
	"params": "test"
}
```

## Deployment:
To deploy the function, make sure gcloud is installed.
```bash
gcloud functions deploy ball --runtime nodejs10 --trigger-http
```

## Usage:
Type the commands into your slack channel:
```
/ball Lebron James
/ball Lakers
/ball Western
/ball Eastern
/ball today
```

## Contributing:


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License:
[ISC](https://choosealicense.com/licenses/isc/)