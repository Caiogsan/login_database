import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class Database {
    
    async list(search){
        let users

        if(search){
            users = await sql`select * from users where ilike ${'%' + search + '%'}`
        } else {
            users = await sql`select * from users`
        }

        return users
    }

    async create(user){
        const itemId = randomUUID()

        const { email, username, password } = user

        await sql`INSERT INTO users (email, username, password) VALUES (${email}, ${username}, ${password})`
    }

    async update(id, user){
        const { email, username, password } = user

        await sql`update users set email = ${email}, username = ${username}, password = ${password} WHERE id = ${id}`
    }

    async delete(id){
        await sql`delete from users where id = ${id}`
    }

}