<script setup lang="ts">
import { definePageMeta, useAuth, ref } from '#imports'
import { fetchWithAuth } from '~/composables/fetchWithAuth'

definePageMeta({ middleware: 'auth' })
const { data, signOut } = useAuth()
const testP = ref(false)

const t = await fetchWithAuth('/api/test')
testP.value = !!t

async function test() {
    const res = await fetchWithAuth('/api/test')
    const res2 = await fetchWithAuth('/api/test2')

    console.log(res)
    console.log(res2)
}
</script>

<template>
    <h1>Main page</h1>
    <button @click="signOut">Logout</button>
    <button @click="test">Test</button>
    <div v-if="testP">Test Text</div>
    <div> {{ data.user }}</div>
</template>

<style scoped>

</style>