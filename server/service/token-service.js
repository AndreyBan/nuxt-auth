import { useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'

/**
 * Get tokens
 * @param payload
 * @returns {{accessToken: (*), refreshToken: (*)}}
 */
export function getTokens(payload) {
    const config = useRuntimeConfig()
    const secretKey = {
        accessKey: config.jwtAccessSecret,
        refreshKey: config.jwtRefreshSecret
    }
    const accessToken = jwt.sign(payload, secretKey.accessKey, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, secretKey.refreshKey, { expiresIn: '10d' })

    return { accessToken, refreshToken }
}
