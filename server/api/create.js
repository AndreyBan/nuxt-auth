import { defineEventHandler } from '#imports';
import { users } from '../models/users.js'
export default defineEventHandler(async () => {
    await users.create({
        login: 'test',
        password: 'test',
        rt: ''
    })
})