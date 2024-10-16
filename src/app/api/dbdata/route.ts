import { NextResponse } from 'next/server';
import { Sequelize, Options } from 'sequelize';
import * as tedious from 'tedious';

export async function GET() {

// Ensure environment variables are correctly set
async function getData(): Promise<string> {
  const options: Options = {
    database: 'testswldb',
    host: 'testsqlbdserver.database.windows.net',
    port: 1433,
    dialect: "mssql",
    logging: console.log,
    dialectModule: tedious,
    dialectOptions: {
        authentication: {
            type: "azure-active-directory-default",
            options: {
            clientId: 'c083c189-2c9b-4ff0-9040-ee1961ef2c0e', // user-assigned client id
            },
        },
        options: {
            encrypt: true,
            connectTimeout: 30000,
        }
    },
  };
  const sequelize = new Sequelize(options)
  try{
    await sequelize.authenticate()
    return 'Connection has been established successfully.';
  }
  catch(err) {
    return `Unable to connect to the database: ${(err as Error).message}`;
  };
}

return NextResponse.json(await getData())
}
