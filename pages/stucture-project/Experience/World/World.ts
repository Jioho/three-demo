import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']

  environment?: Environment
  floor?: Floor
  fox?: Fox

  constructor() {
    this.experience = Experience.getInstance()
    this.scene = this.experience.scene

    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.floor = new Floor()
      this.fox = new Fox()
    })
  }

  update() {
    this.fox?.update()
  }
}
