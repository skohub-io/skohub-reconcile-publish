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
  publish_service_url: process.env.PUBLISH_SERVICE_URL,
  wikimedia_auth_url: process.env.WIKIMEDIA_AUTH_URL,
  wikimedia_token_url: process.env.WIKIMEDIA_TOKEN_URL,
  wikimedia_id: process.env.WIKIMEDIA_ID,
  wikimedia_secret: process.env.WIKIMEDIA_SECRET,
  orcid_auth_url: process.env.ORCID_AUTH_URL,
  orcid_token_url: process.env.ORCID_TOKEN_URL,
  orcid_getuser_url: process.env.ORCID_GETUSER_URL,
  orcid_id: process.env.ORCID_ID,
  orcid_secret: process.env.ORCID_SECRET,
  contact_mail: process.env.CONTACT_MAIL,
  session_secret: process.env.SESSION_SECRET,
}

if (result.error) {
  console.log(result.error, '[Error Parsing env variables!]')
  throw result.error
};
