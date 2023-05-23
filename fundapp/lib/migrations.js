import executeQuery from "./db.js";
import path from "path";
import { fileURLToPath } from 'url';
const tables = ["user", "session", "reward", "project", "funding"];
const fullPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../schema/");

const createTables = async () => {
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const query = `${fullPath}${table}.sql`
    // await executeQuery(query.default)
    console.log(query);
  }
};

createTables();
