import dotenv from "dotenv";
dotenv.config();

const envVars = {
  FORNTEND_URL: process.env.FORNTEND_URL,
  DB_CONNECT: process.env.DB_CONNECT,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
};

export default function getEnvVar(varName) {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit();
  } else {
    return envVars[varName];
  }
}
