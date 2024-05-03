import { setCookie } from '#imports'

/**
 *
 * @param event
 * @param refreshToken
 * @param accessToken
 */
export function setTokenCookie(event, { refreshToken = '', accessToken = '' }) {
    if (refreshToken) {
        setCookie(event, 'refresh_token', refreshToken, {
            maxAge: 60 * 60,
            httpOnly: true,
            sameSite: 'strict'
        })
    }
    if (accessToken) {
        setCookie(event, 'auth:token', accessToken, {
            maxAge: 60 * 60
        })
    }
}