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
    dialectModule: tedious,
    dialectOptions: {
      options: {
        encrypt: true,
        requestTimeout: 30000,
        connectTimeout: 30000,
      },
      authentication: {
        type: "azure-active-directory-default",
        options: {
          clientId: 'c083c189-2c9b-4ff0-9040-ee1961ef2c0e', // user-assigned client id
        },
      },
    },
  };
  const sequelize = new Sequelize(options)
  try{
    await sequelize.authenticate()
    return 'Connection has been established successfully.';
  }
  catch(err) {
    console.error('Unable to connect to the database:', err);
    if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    }
    return `Unable to connect to the database: ${(err as Error).message}`;
  };
}

return NextResponse.json(await getData())
}
