# Invisible Technologies Weather App
A weather app to get weather forcast for US cities.

## Setup

### Clone the project
```console
$ git clone https://github.com/ivange94/invisible-technologies-weatherapp.git weatherapp
```

```console
$ cd weatherapp
```
Create a `.env` file with a value for `OPEN_WEATHER_API_KEY`

## Install dependencies and build

```console
$ npm install
$ npm run build
```

This will generate a `/dist` folder with you can deploy.

### Start production server

```console
node server.js
```
### Run development server (for live reload)

```console
$ npm start
```

This will spin up a dev server on http://localhost:8080/ with live reload enabled.
