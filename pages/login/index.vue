<script setup>
import InputText from '~/components/FormComponents/InputText.vue'
import { ref, useAuth, definePageMeta } from '#imports'

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    }
})
const { signIn } = useAuth()
const login = ref('')
const password = ref('')

async function logIn() {
    const body = { login: login.value, password: password.value }
    try {
        await signIn(body, { callbackUrl: '/' })
    } catch (e) {
        console.warn(e.message)
    }

}
</script>

<template>
    <section class="form-section">
        <form class="c-form" @submit.prevent="logIn">
            <h1 class="title">Войти</h1>
            <InputText v-model:value="login" :placeholder="'Введите телефон'" />
            <InputText v-model:value="password" :placeholder="'Введите пароль'" />
            <button type="submit" class="btn">
                Войти
            </button>
        </form>
        <nuxt-link to="/registration/"/>
    </section>
</template>

<style scoped lang="scss">
.title {
    font-family: 'Roboto', sans-serif;
    text-align: center;
}

.form-section {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.c-form {
    width: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.form-field {
    display: flex;
    margin-bottom: 24px;
    width: 100%;

    &__input {
        height: 40px;
        width: 100%;
        padding: 0 16px;
    }
}

.btn {
    display: block;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
}
</style>