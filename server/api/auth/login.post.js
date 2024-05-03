import { defineEventHandler, readBody, createError } from '#imports'
import { db } from '~/server/service/db.js'
import { users } from '~/server/models/users.js'
import { getHash } from '~/server/service/crypto.js'
import { setTokenCookie } from '~/server/service/cookie-service.js'
import { getTokens } from '~/server/service/token-service.js'

export default defineEventHandler(async (event) => {
    db.authenticate().catch(error => console.error(error))

    const { login, password } = await readBody(event)
    const hashPassword = await getHash(password)
    const user = await users.findOne({ where: { login: login, password: hashPassword } })

    if (!user) throw createError({ statusCode: 401, message: 'Error auth' })

    const payload = { id: user.id, login: user.login }
    const { accessToken, refreshToken } = getTokens(payload)
    const updateUser = await users.update({ rt: refreshToken }, { where: { login } })

    if (!updateUser[0]) throw createError({ statusCode: 401, message: 'Not auth' })

    setTokenCookie(event, { refreshToken })

    return { token: { accessToken, data: user } }
})