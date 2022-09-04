import { Mesh, Scene } from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import sources, { source } from './sources'
import Debug from './Utils/Debug'

let instances: Experience

export default class Experience {
  canvas: HTMLCanvasElement
  sizes: Sizes
  time: Time
  scene: Scene
  camera: Camera
  renderer: Renderer
  world: World
  resources: Resources<typeof sources>
  debug: Debug

  static getInstance() {
    return instances
  }

  constructor(canvas: HTMLCanvasElement) {
    instances = this

    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    // TODO fix sources
    // @ts-ignore
    this.resources = new Resources<typeof sources>(sources)

    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.debug = new Debug()

    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    this.scene.traverse(child => {
      // child()
      if (child instanceof Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }

        // child.material.forEach(key => {
        //   child.material
        // });
      }
    })

    this.camera.controls.dispose()

    this.renderer.instance.dispose()

    this.debug.ui?.destroy()
  }
}
