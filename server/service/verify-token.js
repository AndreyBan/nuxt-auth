import { useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'
export default async (token, type = 'refresh' || 'access') => {
    const config = useRuntimeConfig()
    const secretKey = {
        accessKey: config.jwtAccessSecret,
        refreshKey: config.jwtRefreshSecret,
    }

    return await new Promise((resolve) => {
        const secret = type === 'refresh' ? secretKey.refreshKey : secretKey.accessKey
        jwt.verify(token, secret, (error, payload) => {
            if (error) resolve({ success: false, error: error.name, data: null })
            resolve({ success: true, error: null, data:  payload })
        })
    })
}