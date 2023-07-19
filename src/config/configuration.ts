export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  database: {
    host: process.env.MSSQL_HOST,
    port: parseInt(process.env.MSSQL_PORT, 10),
    username: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
  },
});
