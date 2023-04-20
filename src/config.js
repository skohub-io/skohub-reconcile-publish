import dotenv from 'dotenv'

const result = dotenv.config()
export const config = {
  app_port: process.env.APP_PORT,
  app_port_exposed: process.env.APP_PORT_EXPOSED,
  es_proto: process.env.ES_PROTO,
  es_host: process.env.ES_HOST,
  es_port: process.env.ES_PORT,
  es_user: process.env.ES_USERNAME,
  es_pass: process.env.ES_PASSWORD,
  es_index: process.env.ES_INDEX,
  reconcile_service_url: process.env.RECONCILE_SERVICE_URL,
}

if (result.error) {
  console.log(result.error, '[Error Parsing env variables!]')
  throw result.error
};
