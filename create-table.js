import { sql } from "./db.js";

sql`
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        email TEXT,
        username TEXT,
        password TEXT
    )
`.then(() => {
    console.log('tabela criada')
})