import { defineEventHandler, getCookie } from '#imports';
import verifyToken from "~/server/service/verify-token.js";
import refreshToken from "~/server/service/refresh-token.js";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth:token')
    const {data, error} = await verifyToken(token, 'access')

    if (!error) return {user: data}

    const {success, data: {accessToken}} = await refreshToken(event)

    if (success) {
        const {data: newData} = await verifyToken(accessToken, 'access')

        return {user: newData}
    }

    return {user: null}
})