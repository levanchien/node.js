const request = require('./request');

request.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(data => console.log(data))
    .catch(error => console.log(error));

async function get() {
    const data = await request.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    console.log(data);
}

get();