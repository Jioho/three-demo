import '/assets/style/common.less'
import Experience from './Experience/Experience'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

window.experience = new Experience(canvas)
