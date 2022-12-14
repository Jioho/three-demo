import { CircleBufferGeometry, CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding } from 'three'
import Experience from '../Experience'
import { sourceName } from '../sources'

export default class Floor {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  geometry!: CircleGeometry
  textures!: {
    [name: string]: sourceName['texture']
  }
  material!: MeshStandardMaterial
  mesh!: Mesh

  constructor() {
    this.experience = Experience.getInstance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setGeometry()
    this.setTexure()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new CircleBufferGeometry(5, 64)
  }

  setTexure() {

    this.textures = {}

    this.textures.color = this.resources.items.grassColorTexture
    this.textures.color.encoding = sRGBEncoding
    this.textures.color.repeat.set(1.5, 1.5)
    this.textures.color.wrapS = RepeatWrapping
    this.textures.color.wrapT = RepeatWrapping

    this.textures.normal = this.resources.items.grassNormalTexture
    this.textures.normal.repeat.set(1.5, 1.5)
    this.textures.normal.wrapS = RepeatWrapping
    this.textures.normal.wrapT = RepeatWrapping
  }

  setMaterial() {
    this.material = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
