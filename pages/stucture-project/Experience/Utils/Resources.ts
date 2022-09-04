import { source, sourcesMap } from '../sources'
import EventEmitter from './EventEmitter'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { CubeTextureLoader, TextureLoader } from 'three'

export default class Resources<IT extends readonly unknown[]> extends EventEmitter {
  sources: source[]
  items: sourcesMap<IT>
  toload: number
  loaded: number
  loaders!: {
    gltfLoader: GLTFLoader
    textureLoader: TextureLoader
    cubeTextureLoader: CubeTextureLoader
  }

  constructor(sources: source[]) {
    super()

    this.sources = sources

    this.items = {} as sourcesMap<IT>
    this.toload = this.sources.length
    this.loaded = 0

    this.setLoader()
    this.startLoading()
  }

  setLoader() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader()
    }
  }

  startLoading() {
    // TODO 优化这部分，把不同类型在分出去
    this.sources.forEach(source => {
      switch (source.type) {
        case 'cubeTexure':
          this.loaders.cubeTextureLoader.load(source.path, file => {
            this.sourceLoaded<typeof file>(source.name, file)
          })
          break
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, file => {
            this.sourceLoaded<typeof file>(source.name, file)
          })
          break
        case 'texture':
          this.loaders.textureLoader.load(source.path, file => {
            this.sourceLoaded<typeof file>(source.name, file)
          })
          break
      }
    })
  }

  sourceLoaded<T>(source: string, file: T) {
    Object.assign(this.items, { [source]: file })

    this.loaded++

    if (this.loaded === this.toload) {
      this.trigger('ready')
    }
  }
}
