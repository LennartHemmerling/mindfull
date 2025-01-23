<script>
import debounce from 'debounce'

export default {
    props: ['modelValue', 'placeholder', 'disabled', 'debounce'],
    computed: {
        debounceInputVal() {
            return debounce(function (val) {
                this.$emit('update:modelValue', val)
            }, Number(this.debounce))
        },
        inputVal: {
            get() {
                return this.modelValue
            },
            set(val) {
                if (this.debounce) this.debounceInputVal(val)
                else this.$emit('update:modelValue', val)
            }
        }
    }
}
</script>

<template>
    <input v-model="inputVal" :placeholder="placeholder" :disabled="disabled" />
</template>
