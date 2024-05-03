import { db } from '~/server/service/db.js'
import { users } from '~/server/models/users.js'
import verifyToken from '~/server/service/verify-token.js'
import { getTokens } from '~/server/service/token-service.js'
import { setTokenCookie } from '~/server/service/cookie-service.js'
import { getCookie, createError } from '#imports'

export default async (event) => {
    db.authenticate().catch(error => console.error(error))

    const oldRefresh = getCookie(event, 'refresh_token')
    const { success } = await verifyToken(oldRefresh, 'refresh')

    if (!success) {
        await users.update({ rt: '' }, { where: { rt: oldRefresh } })
        throw createError({ statusCode: 401, message: 'Token not verify' })
    }

    const user = await users.findOne({ where: { rt: oldRefresh } })

    if (!user) throw createError({ statusCode: 401, message: 'User not found' })

    const payload = { id: user.id, login: user.login }
    const { accessToken, refreshToken } = getTokens(payload)
    const updateUser = await users.update({ rt: refreshToken }, { where: { id: user.id } })

    if (!updateUser[0]) throw createError({ statusCode: 401, message: 'Not auth' })

    setTokenCookie(event, { refreshToken, accessToken })

    return { success: true, data: { accessToken, refreshToken } }
}