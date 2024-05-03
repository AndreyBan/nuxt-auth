import { defineEventHandler, getHeaders, createError } from '#imports';
import verifyToken from "~/server/service/verify-token.js";

export default defineEventHandler(async (event) => {
    const header = getHeaders(event)
    const at = header.authorization.split(' ')[1]
    const verify = await verifyToken(at, 'access')

    if (!verify.success) throw createError({statusCode: 401, message: 'Not auth'})

    return {
        success: true
    }
})