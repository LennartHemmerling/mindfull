<script>
import debounce from 'debounce'

export default {
    props: ['modelValue', 'placeholder', 'spellcheck', 'disabled', 'debounce'],
    mounted() {
        this.updateHeight()
    },
    methods: {
        updateHeight() {
            this.$refs.element.style.height = ''
            this.$refs.element.style.height =
                this.$refs.element.scrollHeight + 'px'
        }
    },
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
                this.updateHeight()
                if (this.debounce) this.debounceInputVal(val)
                else this.$emit('update:modelValue', val)
            }
        }
    },
    watch: {
        disabled() {
            this.updateHeight()
        }
    }
}
</script>

<template>
    <textarea
        ref="element"
        v-model="inputVal"
        :placeholder="placeholder"
        :spellcheck="spellcheck"
        :disabled="disabled"
    ></textarea>
</template>

<style scoped>
textarea {
    resize: none;
}
</style>
