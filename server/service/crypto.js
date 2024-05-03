import { scrypt } from 'node:crypto'
export function getHash(value) {
    return new Promise((resolve, reject) => {
        scrypt(value, process.env.SALT_CRYPTO, 64, (err, derivedKey) => {
            if (err) reject(err)
            resolve(derivedKey.toString('hex'))
        })
    } )
}