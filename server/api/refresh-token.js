import { defineEventHandler, createError, getHeaders } from '#imports'
import refreshToken from '~/server/service/refresh-token.js'
import verifyToken from '~/server/service/verify-token.js'

export default defineEventHandler(async (event) => {
    const { authorization } = getHeaders(event)

    if (!authorization) throw createError({ statusCode: 401, message: 'Not auth' })

    const accessToken = authorization.split(' ')[1]
    const verify = await verifyToken(accessToken, 'access')

    if (verify.error !== 'TokenExpiredError') throw createError({ statusCode: 401, message: 'Not auth' })

    const newTokens = await refreshToken(event)

    if (!newTokens.success) throw createError({ statusCode: 401, message: 'Not auth' })

    return { success: true }

})