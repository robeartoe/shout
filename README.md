# Shout:
Shout is a slack command written in deno. It is made to GET YOUR POINTS ACROSS WHILE IN SLACK.

## Installation:
Clone this repository
```bash 
git clone https://github.com/robeartoe/shout.git
```
Using the config.default.json file as a template, make a config.json file with your slack token:
```
{
    "SLACK_TOKEN" : "YOUR_SLACK_TOKEN"
}
```

## Development:
<!-- TODO: Redo this section for Cloud Run -->

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
 #TODO: Build command / script!
```

## Usage:
Type the commands into your slack channel:
```
/shout see? I'm really passionate about this topic!
```

## Contributing:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License:
[ISC](https://choosealicense.com/licenses/isc/)