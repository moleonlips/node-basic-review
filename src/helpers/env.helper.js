const path = require("path");

const { config } = require("dotenv");
config().parsed;

console.log(`Environment ${process.env.NODE_ENV} in use!`)

const envFound = config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
})

if (!envFound) throw new Error(`Couldn't find .env file!`);