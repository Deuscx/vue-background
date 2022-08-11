<script setup lang="ts">
import { backgroundConfigState, backgroundImageUrls } from '~/composables'

const currentCamera = ref<string>()
const { videoInputs: cameras, audioInputs: microphones } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const currentMicrophone = computed(() => microphones.value[0]?.deviceId)

const { stream, enabled } = useUserMedia({
  videoDeviceId: currentCamera,
  audioDeviceId: currentMicrophone,
})
</script>

<template>
  <div>
    <button @click="enabled = !enabled">
      {{ enabled ? 'Stop' : 'Start' }}
    </button>
  </div>
  <div>
    <div
      v-for="camera of cameras"
      :key="camera.deviceId"
      class="px-2 py-1 cursor-pointer"
      :class="{ 'text-primary': currentCamera === camera.deviceId }"
      @click="currentCamera = camera.deviceId"
    >
      {{ camera.label }}
    </div>
  </div>

  <section grid="~ cols-3 gap-4">
    <div>
      <label for="">Source</label>
      <VideoPlayer
        v-if="stream"
        :stream="stream"
      />
    </div>
  </section>

  <section>
    <div
      flex
      gap1
      cursor-pointer
    >
      <img
        v-for="url in backgroundImageUrls"
        :key="url"
        w30
        h30
        :src="url"
        @click="backgroundConfigState.url = url"
      >
    </div>
  </section>
</template>

