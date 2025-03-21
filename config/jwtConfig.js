// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
require('dotenv').config()
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createAccessToken() {
  const accessToken = await client.verify.v2
    .services(process.env.TWILIO_MESSAGING_SERVICE_SID)
    .accessTokens.create({
      factorType: "push",
      identity: "Identity",
    });

  console.log(accessToken.sid);
}

createAccessToken();