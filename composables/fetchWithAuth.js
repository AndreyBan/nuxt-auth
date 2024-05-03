import isExpiredToken from '~/composables/isExpiredToken.js'
import { useAuth, useCookie, useFetch } from '#imports'

export const fetchWithAuth = async (url, fetchOptions) => {
    const { signOut } = useAuth()

    try {
        const isExp = isExpiredToken()
        let token = useCookie('auth:token').value

        if (!token) await signOut()

        let headers = { authorization: `Bearer ${ token }` }

        if (isExp) {
            const { error: errorRefresh } = await useFetch('/api/refresh-token/', { headers })

            if (errorRefresh.value) await signOut()

            token = useCookie('auth:token').value
            headers = { authorization: `Bearer ${ token }` }
        }

        const options = { ...fetchOptions, headers }
        const { data, error } = await useFetch(url, options)

        if (error.value && [401, 403].includes(error.value.statusCode)) await signOut()
        else if (error.value) return { success: false, error: error.value, data: null }

        return data.value
    } catch (e) {
        console.warn(e.message)
        await signOut()
    }
}