<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
const props = defineProps<{ stream: PropType<MediaStream> }>()

const video = ref()

onMounted(async () => {
  await nextTick()
  if (props.stream) {
    video.value.srcObject = props.stream
    video.value.play()
  }
})

onBeforeUnmount(() => {
  if (video.value)
    video.value.srcObject = null
})
</script>

<template>
  <video
    ref="video"
    autoplay
    playinline
  />
</template>

<style scoped>
</style>
