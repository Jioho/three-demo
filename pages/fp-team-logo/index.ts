import '/assets/style/common.less'
import dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const canvas = document.querySelector('.webgl')
const params = {
  color: 0x522a0f,
  metalness: 0.4,
  roughness: 0,
  ambientColor: 0xffffff,
  directionalColor: 0xffffff,
  pointColor: 0xffffff
}
const gui = new dat.GUI()

gui.addColor(params, 'color').onChange(() => {
  const color = new THREE.Color(params.color)
  cube.material.color = color
  cone.material.color = color
  torus.material.color = color
})
gui.addColor(params, 'ambientColor').onChange(() => {
  const color = new THREE.Color(params.ambientColor)
  ambientLight.color = color
})
gui.addColor(params, 'directionalColor').onChange(() => {
  const color = new THREE.Color(params.directionalColor)
  directionalLight.color = color
}).name('直射光颜色')
gui.addColor(params, 'pointColor').onChange(() => {
  const color = new THREE.Color(params.pointColor)
  pointLight.color = color
}).name('点光颜色')

gui.add(params, 'metalness', 0, 1, 0.1).onChange(() => {
  cube.material.metalness = params.metalness
  cone.material.metalness = params.metalness
  torus.material.metalness = params.metalness
})
gui.add(params, 'roughness', 0, 1, 0.1).onChange(() => {
  cube.material.metalness = params.metalness
  cone.material.metalness = params.metalness
  torus.material.metalness = params.metalness
})

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(params.ambientColor, 0.9)
scene.add(ambientLight)
const ambientGroup = gui.addFolder('ambient')
ambientGroup.add(ambientLight, 'intensity', 0, 50, 0.01)

const directionalLight = new THREE.DirectionalLight(0xffffff, 5.2)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
directionalLightHelper.visible = false
directionalLight.position.x = -6
directionalLight.position.y = 5.3
directionalLight.position.z = -0.4

const directionalGroup = gui.addFolder('directional-light')
directionalGroup.add(directionalLight.position, 'x', -10, 10, 0.1)
directionalGroup.add(directionalLight.position, 'y', -10, 10, 0.1)
directionalGroup.add(directionalLight.position, 'z', -10, 10, 0.1)
directionalGroup.add(directionalLight, 'intensity', 0, 50, 0.1).name('灯光强度')
directionalGroup.add(directionalLightHelper, 'visible')

scene.add(directionalLight, directionalLightHelper)

const pointLight = new THREE.PointLight(params.pointColor, 2.66, -3.51)
pointLight.position.set(-3.5, 0.02, 0)
scene.add(pointLight)

const sphereSize = 1
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
pointLightHelper.visible = false

scene.add(pointLightHelper)

const pointGroup = gui.addFolder('pointLight')
pointGroup.add(pointLight.position, 'x', -10, 10, 0.01)
pointGroup.add(pointLight.position, 'y', -10, 10, 0.01)
pointGroup.add(pointLight.position, 'z', -10, 10, 0.01)

pointGroup.add(pointLight, 'intensity', 0, 10, 0.01)
pointGroup.add(pointLight, 'distance', -10, 10, 0.01)
pointGroup.add(pointLightHelper, 'visible')

// 区域光
// const reactAreaLight = new THREE.RectAreaLight(0xffffff, 10, 2, 2)
// const reactAreaLightHelper = new RectAreaLightHelper(reactAreaLight)

// reactAreaLight.position.x = -5.3
// reactAreaLight.position.y = 0
// reactAreaLight.position.z = 1.1
// reactAreaLight.rotation.y = -Math.PI / 2
// const lightGroup = gui.addFolder('react-light')
// lightGroup.add(reactAreaLight.position, 'x', -10, 10, 0.1)
// lightGroup.add(reactAreaLight.position, 'y', -10, 10, 0.1)
// lightGroup.add(reactAreaLight.position, 'z', -10, 10, 0.1)
// lightGroup.add(reactAreaLight.rotation, 'x', -10, 10, 0.1).name('rotation-x')
// lightGroup.add(reactAreaLight.rotation, 'y', -10, 10, 0.1).name('rotation-y')
// lightGroup.add(reactAreaLight, 'intensity', 0, 10, 0.1).name('灯光强度')
// lightGroup.add(reactAreaLightHelper, 'visible')
// scene.add(reactAreaLight, reactAreaLightHelper)

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: params.color }))
cube.position.x = -1.5
cube.rotation.x = -0.1
cube.rotation.y = -0.82
cube.rotation.z = -0.8
cube.material.metalness = params.metalness
const cubeGroup = gui.addFolder('cube')
cubeGroup.add(cube.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
cubeGroup.add(cube.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
cubeGroup.add(cube.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)

scene.add(cube)

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.3, 64), new THREE.MeshStandardMaterial({ color: params.color }))
cone.rotation.x = -0.3
const coneGroup = gui.addFolder('cone')
coneGroup.add(cone.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
cone.material.metalness = params.metalness
scene.add(cone)

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.45, 0.22, 32, 64), new THREE.MeshStandardMaterial({ color: params.color }))
torus.position.x = 1.5
torus.material.metalness = params.metalness

torus.rotation.x = -0.14
torus.rotation.y = -0.55
const torusGroup = gui.addFolder('torus')
torusGroup.add(torus.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
torusGroup.add(torus.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)

scene.add(torus)

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)

camera.position.z = 6
scene.add(camera)

const controls = new OrbitControls(camera, canvas as HTMLCanvasElement)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.setClearColor('#2e2721')

const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
