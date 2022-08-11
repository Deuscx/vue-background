import type { BackgroundConfig } from '~/types'

export const backgroundImageUrls = [
  'bg01.jpg',
  'bg02.jpg',
].map(imageName => `./backgrounds/${imageName}`)

export const useBackgroundConfig = createGlobalState(() =>
  useStorage<BackgroundConfig>('backgroundConfig', {
    type: 'none',
    url: '',
  }))

export const backgroundConfigState = useBackgroundConfig()
