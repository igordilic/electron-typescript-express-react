# Electron POC

Electron API with expressJs and optional client with ReactJs

## Setup

Prerequisities:
- nodejs with npm or yarn

Clone this repo, cd into the project root: `npm install` or `yarn`.

## Development

To start dev server, simply run command: `npm start` or `yarn start`.
Test the api in your browser at `localhost:3000`. It should gives you the `Hello Evia`.

## Build

To build an app (windows only), run command: `npm run dist`.
You can find binaries under `/dist` folder in the project's root.

## API

API is running on `http://localhost:3000/api`.
`POST /api/print` accepts `text/html` and prints content to system printing service.
You can test this with Postman or curl, choosing POST method on `http://localhost:3000/api/print`, body should be raw and type `text/html` and paste content from the `print.example.html` file contained in this project.