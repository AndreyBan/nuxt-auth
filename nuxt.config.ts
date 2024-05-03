// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@sidebase/nuxt-auth'],
    ssr: false,
    imports: {
        autoImport: false
    },
    css: [
        '@/assets/scss/style.scss'
    ],
    runtimeConfig: {
        dbUser: process.env.DB_USER,
        dbName: process.env.DB_NAME,
        dbPass: process.env.DB_PASS,
        dbPort: process.env.DB_PORT,
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET_KEY,
        authSecret: process.env.JWT_ACCESS_SECRET_KEY,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET_KEY
    },
    auth: {
        isEnabled: true,
        globalAppMiddleware: false,
        provider: {
            type: 'local',
            token: {
                signInResponseTokenPointer: '/token/accessToken'
            },
            endpoints: {
                signIn: {path: '/login'},
                signOut: {path: '/logout'}
            }
        }
    }
})
