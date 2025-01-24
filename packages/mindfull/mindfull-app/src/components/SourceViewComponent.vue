<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { MindfullSourceComponent } from 'mindfull-ui'

const props = defineProps<{ sourceIndex: number }>()

const sources = [0, 1]

const router = useRouter()

function clickSource(sourceIndex: number) {
    router.replace(`/${sourceIndex}`)
}
</script>

<template>
    <div class="sources">
        <div>
            <template v-for="source in sources" :key="`source-${source}`">
                <mindfull-source-component
                    :source-index="source"
                    :selected="props.sourceIndex === source"
                    :click-source="clickSource"
                />
            </template>
        </div>
    </div>
</template>

<style scoped>
.sources {
    position: relative;
}

.sources > div {
    position: absolute;

    left: 1.5rem;
    right: 0;

    display: flex;
    flex-direction: column;

    gap: 20px;
}
</style>
