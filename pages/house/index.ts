import '/assets/style/common.less'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const textureLoader = new THREE.TextureLoader()

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
const gemoetry = new THREE.BoxBufferGeometry(1, 1, 1)

// 材料
const material = new THREE.MeshBasicMaterial({})

// 网格（承载材料和正方形）
const mesh = new THREE.Mesh(gemoetry, material)

// 场景添加这部分网格内容
scene.add(mesh)

// 创建相机
const size = { width: window.innerWidth, height: window.innerHeight }

document.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 如果不更新相机，会变形
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
})

const canvas = document.querySelector('.webgl')
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)

// 调整相机位置
camera.position.z = 3

// 场景添加相机
scene.add(camera)

// 添加场景控制
const controls = new OrbitControls(camera, canvas as HTMLElement)
controls.enableDamping = true

// 创建renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLElement })
renderer.setSize(size.width, size.height)

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 渲染
renderer.render(scene, camera)

// 帧动画
const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
