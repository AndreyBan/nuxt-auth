<script setup lang="ts">
const regData = {
  name: '',
  phone: '',
  email: '',
  roomNumber: ''
}
</script>

<template>
  <section>
    <form class="c-form" @submit.prevent="logIn">
      <h1 class="title">Войти</h1>
<!--      <div class="form-field">-->
<!--        <input v-model="login" type="text" placeholder="Login" class="form-field__input">-->
<!--      </div>-->
<!--      <div class="form-field">-->
<!--        <input v-model="password" type="text" placeholder="Password" class="form-field__input">-->
<!--      </div>-->
      <button type="submit" class="btn">
        Войти
      </button>
    </form>
  </section>
</template>

<style scoped>

</style>