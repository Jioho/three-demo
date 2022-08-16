import '/assets/style/common.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Float32BufferAttribute, Mesh } from 'three'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const textureLoader = new THREE.TextureLoader()

// 门板素材
const alphaDoor = textureLoader.load('./assets/door/alpha.jpg')
const ambientOcclusionDoor = textureLoader.load('./assets/door/ambientOcclusion.jpg')
const colorDoor = textureLoader.load('./assets/door/color.jpg')
const heightDoor = textureLoader.load('./assets/door/height.jpg')
const metalnessDoor = textureLoader.load('./assets/door/metalness.jpg')
const normalDoor = textureLoader.load('./assets/door/normal.jpg')
const roughnessDoor = textureLoader.load('./assets/door/roughness.jpg')

// 墙壁素材
const ambientOcclusionWall = textureLoader.load('./assets/bricks/ambientOcclusion.jpg')
const colorWall = textureLoader.load('./assets/bricks/color.jpg')
const normalWall = textureLoader.load('./assets/bricks/normal.jpg')
const roughnessWall = textureLoader.load('./assets/bricks/roughness.jpg')

// 草地
const ambientOcclusionGrass = textureLoader.load('./assets/grass/ambientOcclusion.jpg')
const colorGrass = textureLoader.load('./assets/grass/color.jpg')
const normalGrass = textureLoader.load('./assets/grass/normal.jpg')
const roughnessGrass = textureLoader.load('./assets/grass/roughness.jpg')

ambientOcclusionGrass.repeat.set(6, 6)
colorGrass.repeat.set(6, 6)
normalGrass.repeat.set(6, 6)
roughnessGrass.repeat.set(6, 6)

ambientOcclusionGrass.wrapS = THREE.RepeatWrapping
colorGrass.wrapS = THREE.RepeatWrapping
normalGrass.wrapS = THREE.RepeatWrapping
roughnessGrass.wrapS = THREE.RepeatWrapping

ambientOcclusionGrass.wrapT = THREE.RepeatWrapping
colorGrass.wrapT = THREE.RepeatWrapping
normalGrass.wrapT = THREE.RepeatWrapping
roughnessGrass.wrapT = THREE.RepeatWrapping

window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

/**
 * 房子
 */
const houseGroup = new THREE.Group()
scene.add(houseGroup)

// 地板
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    aoMap: ambientOcclusionGrass,
    map: colorGrass,
    normalMap: normalGrass,
    roughnessMap: roughnessGrass
  })
)
floor.rotation.x = -Math.PI * 0.5
floor.receiveShadow = true
houseGroup.add(floor)

// 房子本体
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.4, 4),
  new THREE.MeshStandardMaterial({
    map: colorWall,
    aoMap: ambientOcclusionWall,
    normalMap: normalWall,
    roughnessMap: roughnessWall
  })
)

walls.geometry.setAttribute('uv2', new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
floor.receiveShadow = true
walls.position.y = 1.2
houseGroup.add(walls)

// 屋顶
const roof = new THREE.Mesh(new THREE.ConeBufferGeometry(3.5, 1, 4), new THREE.MeshStandardMaterial({ color: '#b35f45' }))
roof.position.y = 2.9
roof.rotation.y = Math.PI * 0.25
houseGroup.add(roof)

// 门口的灯
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

doorLight.position.set(0, 2.2, 2.7)
houseGroup.add(doorLight)

// 门口
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: colorDoor,
    aoMap: ambientOcclusionDoor,
    alphaMap: alphaDoor,
    transparent: true,
    displacementMap: heightDoor,
    displacementScale: 0.1,
    normalMap: normalDoor,
    metalnessMap: metalnessDoor,
    roughnessMap: roughnessDoor
  })
)

door.geometry.setAttribute('uv2', new Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.y = 1
door.position.z = 2.01
houseGroup.add(door)

// 灌木丛
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new Mesh(bushGeometry, bushMaterial)
const bush2 = new Mesh(bushGeometry, bushMaterial)
const bush3 = new Mesh(bushGeometry, bushMaterial)
const bush4 = new Mesh(bushGeometry, bushMaterial)

bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

houseGroup.add(bush1, bush2, bush3, bush4)

// 碑
const gravesGroup = new THREE.Group()
scene.add(gravesGroup)
const count = 50
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.1)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#727272' })
const graves: THREE.Mesh[] = []

for (let i = 0; i <= count; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)

  const angle = Math.random() * Math.PI * 2 // Random angle
  const radius = 3 + Math.random() * 6 // Random radius
  const x = Math.cos(angle) * radius // Get the x position using cosinus
  const z = Math.sin(angle) * radius // Get the z position using sinus

  // Position
  grave.position.set(x, 0.3, z)

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4

  grave.castShadow = true

  graves.push(grave)
  gravesGroup.add(grave)
}

// 雾
// fog 距离相机1 和 15范围能看到烟雾
const fog = new THREE.Fog('#262837', 1, 10)
scene.fog = fog

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 3, 3)
ghost2.castShadow = true
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ff7800', 3, 3)
ghost3.castShadow = true
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
scene.add(ghost3)

/**
 * 相机和渲染
 */
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 2000)
camera.position.set(1, 2, 6)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true

const controls = new OrbitControls(camera, canvas as HTMLCanvasElement)
controls.enableDamping = true

const clock = new THREE.Clock()

// 帧动画
const tick = () => {
  controls.update()

  const elapsedTime = clock.getElapsedTime()

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = -elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = -elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
