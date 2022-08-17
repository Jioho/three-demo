import '/assets/style/common.less'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const canvas = document.querySelector('.webgl')

window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
})

const gui = new GUI()

const params = {
  count: 10000,
  size: 0.01,
  radius: 5,
  branch: 3,
  spin: 2,
  random: 0.2,
  randomPow: 2,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
  speed: 0.1,
  positionX: 0,
  positionY: 1,
  positionZ: 0,
  rotationX: 0.45,
  rotationZ: 0.45
}

// 创建场景
const scene = new THREE.Scene()

let geometry: THREE.BufferGeometry | null = null
let pointMaterial: THREE.PointsMaterial | null = null
let points: THREE.Points | null = null

const generateGalaxy = () => {
  if (geometry !== null || pointMaterial !== null || points !== null) {
    geometry && geometry.dispose()
    pointMaterial && pointMaterial.dispose()
    points && scene.remove(points)
  }

  const colorInside = new THREE.Color(params.insideColor)
  const colorOutside = new THREE.Color(params.outsideColor)

  const positions = new Float32Array(params.count * 3)
  const colors = new Float32Array(params.count * 3)
  geometry = new THREE.BufferGeometry()
  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * params.radius
    const spinAngle = radius * params.spin
    const branchAngle = ((i % params.branch) / params.branch) * 2 * Math.PI

    const randomX = Math.pow(Math.random(), params.randomPow) * (Math.random() < 0.5 ? -1 : 1) * params.random
    const randomY = Math.pow(Math.random(), params.randomPow) * (Math.random() < 0.5 ? -1 : 1) * params.random
    const randomZ = Math.pow(Math.random(), params.randomPow) * (Math.random() < 0.5 ? -1 : 1) * params.random

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = +randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    // positions[i3] = (Math.random() - 0.5) * 3
    // positions[i3 + 1] = (Math.random() - 0.5) * 3
    // positions[i3 + 2] = (Math.random() - 0.5) * 3

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / params.radius)
    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  pointMaterial = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  })

  points = new THREE.Points(geometry, pointMaterial)
  points.position.x = params.positionX
  points.position.y = params.positionY
  points.position.z = params.positionZ
  points.rotation.x = params.rotationX
  points.rotation.z = params.rotationZ
  scene.add(points)
}

gui.add(params, 'count', 1000, 100000, 1).onChange(generateGalaxy)
gui.add(params, 'size', 0.01, 1, 0.01).onChange(generateGalaxy)
gui.add(params, 'radius', 0.1, 20, 0.1).onChange(generateGalaxy)
gui.add(params, 'branch', 2, 20, 1).onChange(generateGalaxy)
gui.add(params, 'spin', -5, 5, 1).onChange(generateGalaxy)
gui.add(params, 'random', 0, 1, 0.01).onChange(generateGalaxy)
gui.add(params, 'randomPow', 1, 10, 1).onChange(generateGalaxy)
gui.addColor(params, 'insideColor').onChange(generateGalaxy)
gui.addColor(params, 'outsideColor').onChange(generateGalaxy)
gui.add(params, 'speed', -5, 5, 0.01)
gui.add(params, 'positionX', -5, 5, 0.1).onChange(generateGalaxy)
gui.add(params, 'positionY', -5, 5, 0.1).onChange(generateGalaxy)
gui.add(params, 'positionZ', -5, 5, 0.1).onChange(generateGalaxy)
gui.add(params, 'rotationX', -5, 5, 0.1).onChange(generateGalaxy)
gui.add(params, 'rotationZ', -5, 5, 0.1).onChange(generateGalaxy)

generateGalaxy()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)

camera.position.x = 2
camera.position.y = 1.3
camera.position.z = 4
scene.add(camera)

// 添加场景控制
const controls = new OrbitControls(camera, canvas as HTMLCanvasElement)
controls.enableDamping = true

// 创建renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement })

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

const clock = new THREE.Clock()

// 帧动画
const tick = () => {
  controls.update()
  if (points) {
    points.rotation.y = clock.getElapsedTime() * params.speed
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
