import { defineEventHandler, getCookie, deleteCookie } from '#imports'
import { db } from '~/server/service/db.js'
import { users } from '~/server/models/users.js'

export default defineEventHandler(async (event) => {
    const rt = getCookie(event, 'refresh_token')

    deleteCookie(event, 'refresh_token')
    db.authenticate().catch(error => console.error(error))
    await users.update({ rt: '' }, { where: { rt } })

    return {
        success: true
    }
})