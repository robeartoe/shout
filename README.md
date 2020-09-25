# Shout:
Shout is a slack command written in deno. It is made to GET YOUR POINTS ACROSS WHILE IN SLACK.

## Installation:
Clone this repository
```bash 
git clone https://github.com/robeartoe/shout.git
```

## Running Locally:
To run locally make sure you have Docker installed, and an API explorer like Insomnia or Postman. The only request is a POST request.
```bash
# Build the application:
docker build --tag shout:0.1 .
# Run the containerized application in the background.
# Expose Port 8080, from within the application, and outside the application.
# Meaning we could access the application from http://localhost:8080
docker run --publish 8080:8080 --detach --name shout shout:0.1
```

When you are done, remove the docker container, and stop it from running:
```bash
docker rm --force shout
```

Afterwards you can send request to that application.
You can send the JSON - POST request:
```json
{
	"text": "test"
}
```

## Deployment:
To deploy the function, make sure gcloud is installed.
Also know what your GCP project ID is, because that is where we are sending our code to be containerized & deployed.
```bash
 gcloud builds submit --tag gcr.io/${YOUR GCP Project ID}/shout
 gcloud run deploy --image gcr.io/${YOUR GCP Project ID}/shout --platform managed
```

## Usage:
Instal the application onto your slack channel.
Link the slack command to the cloud run URL to send commands to.
Then you should be good to go!
Type the commands into your slack channel:
```
/shout see? I'm really passionate about this topic!
```

## Contributing:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License:
[ISC](https://choosealicense.com/licenses/isc/)