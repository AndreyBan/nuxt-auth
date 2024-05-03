<script setup lang="ts">
defineProps({
    value: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
})

defineEmits(['update:value'])
</script>

<template>
    <div class="form-field">
        <input
            :value="value"
            type="text"
            :placeholder="placeholder"
            class="form-field__input"
            @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
        >
    </div>
</template>

<style scoped lang="scss">
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
</style>