# Pilionerzy

This project is a (mainly) mathematical version of the famous game show
*Who Wants to Be a Millionaire?* It is an Angular 13 based application.

## Development

Run `ng serve` and navigate to `http://localhost:4200`.
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project with the production configuration.
The build artifacts will be stored in the `dist/` directory.
A docker image can be build as well; just run, e.g.,
```bash
docker build -t pilionerzy-frontend .
```
to create an [nginx](https://hub.docker.com/_/nginx) based image.

## Configuration

For a back-end connection the address to the REST endpoint has to be configured.
It should be done by editing the constant `REST_ENDPOINT` in the file `src/app/config.ts`.
The address defaults to `http://localhost:8080`.
