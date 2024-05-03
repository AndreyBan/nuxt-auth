import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
    secret: '123',
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                login: { label: 'Login', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize(credentials) {
                if (credentials.login === 'test') {
                    const user = {
                        id: '1',
                        name: 'J Smith',
                        username: 'jsmith'
                    }

                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            console.warn("JWT callback", { token, user });
            return {
                ...token,
                ...user
            }
        }
    }
})
