import { DirectionalLight, Mesh, MeshStandardMaterial, sRGBEncoding } from 'three'
import Experience from '../Experience'
import { sourceName } from '../sources'

export default class Environment {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  sunLight!: DirectionalLight

  enviromentMap!: {
    intensity: number
    texture: sourceName['CubeTexture'] // CubeTexture
  }

  constructor() {
    this.experience = Experience.getInstance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunLight()
    this.setEnviromentMap()
  }

  setSunLight() {
    this.sunLight = new DirectionalLight('#ffffff', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 3, -2.25)
    this.scene.add(this.sunLight)
  }

  setEnviromentMap() {
    this.enviromentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture
    }

    // TODO 优化resource
    console.log(this.resources.items, '?this.enviromentMap.texture')
    this.enviromentMap.texture.encoding = sRGBEncoding
    // this.enviromentMap.texture.encodinig = sRGBEncoding
    this.scene.environment = this.enviromentMap.texture

    const updateMaterial = () => {
      this.scene.traverse(child => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          child.material.envMap = this.enviromentMap.texture
          child.material.envMapIntensity = this.enviromentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }

    updateMaterial()
  }
}
