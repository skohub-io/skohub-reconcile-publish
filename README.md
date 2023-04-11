# SkoHub Reconcile Publish

This respository provides a simple web service that can be used to publish vocabularies as Turtle Files to the [SkoHub Reconcile Service](https://github.com/skohub-io/skohub-reconcile).

It is a simple Express.js application that provides an HTML-Upload form on its root and an upload endpoint under `/upload`.

Uploaded files are stored in an `uploads` folder.

You can also upload files to the service using `curl`.
To do so, you have to provide the following parameters:

- account: the account name for the SkoHub Reconcile Service
- id: this is used for logging out the upload status and should be unique (try `uuidgen` for a unique id)

`curl -F uploaded_file=@./uploads/dini-ag-kim/hcrt.ttl -F account=test -F id=123 http://localhost:3030/upload`

## Setup

Development:
  - node >= 18 (for development)

Running the Service:
- docker

To run the service, you need to have a `.env` file in the root directory of the project.
You can use the provided `.sample.env` as a template.
Run `cp .sample.env .env` to create the environment file.

    APP_PORT=3030 # port on which the service is running
    ES_PROTO=http # protocol of the elasticsearch instance
    ES_HOST=localhost # host of the elasticsearch instance
    ES_PORT=9200  # port of the elasticsearch instance
    ES_USERNAME= # username for the elasticsearch instance
    ES_PASSWORD= # password for the elasticsearch instance
    ES_INDEX=skohub-reconcile # index name for the elasticsearch instance

Then, you can run the service with:

    $ docker compose up

This will start the Reconciliation service on the port specified with `APP_PORT` in `.env`. 

## Development

Install dependencies with `npm i`.
Then start the service with `npm run dev`.

## Credits

<a target="_blank" href="https://www.hbz-nrw.de"><img src="https://raw.githubusercontent.com/skohub-io/skohub.io/main/img/logo-hbz-color.svg" width="120px"></a>