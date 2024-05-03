import { useCookie } from '#imports'
export default function () {
    const tokenExpired = useCookie('auth:token')
    const payload = tokenExpired.value.split('.')[1]
    const decodePayload = JSON.parse(atob(payload))
    const dateExp = decodePayload.exp * 1000

    return new Date().getTime() > new Date(dateExp).getTime()
}