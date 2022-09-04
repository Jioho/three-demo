import type GUI from 'lil-gui'
import { AnimationMixer, Mesh } from 'three'
import Experience from '../Experience'

export default class Fox {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  time: Experience['time']
  debug: Experience['debug']

  debugFolder?: GUI

  // todo
  resource: any
  model: any
  animation: any

  constructor() {
    this.experience = Experience.getInstance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    if (this.debug.active && this.debug.ui) {
      this.debugFolder = this.debug.ui.addFolder('fox')
    }

    this.resource = this.resources.items.foxModel

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    // TODO 优化这部分
    console.log(this.resource.scene, 'this.resource.scene')
    this.model = this.resource.scene
    this.model.scale.set(0.02, 0.02, 0.02)
    this.scene.add(this.model)

    // @ts-ignore
    this.model.traverse(child => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new AnimationMixer(this.model)
    // this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
    // this.animation.action.play()

    this.animation.action = {}

    this.animation.action.idle = this.animation.mixer.clipAction(this.resource.animations[0])
    this.animation.action.waking = this.animation.mixer.clipAction(this.resource.animations[1])
    this.animation.action.running = this.animation.mixer.clipAction(this.resource.animations[2])

    this.animation.action.current = this.animation.action.idle
    this.animation.action.current.play()

    this.animation.play = (name: string) => {
      const newAction = this.animation.action[name]
      const oldAction = this.animation.action.current

      newAction.reset()
      newAction.play()
      // TODO 添加类型推测
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.action.current = newAction
    }

    // debug
    const debugObject = {
      playIdle: () => this.animation.play('idle'),
      playWaking: () => this.animation.play('waking'),
      playRunning: () => this.animation.play('running')
    }
    this.debugFolder?.add(debugObject, 'playIdle')
    this.debugFolder?.add(debugObject, 'playWaking')
    this.debugFolder?.add(debugObject, 'playRunning')
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001)
  }
}
