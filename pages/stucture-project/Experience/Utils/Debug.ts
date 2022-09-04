import debug from 'lil-gui'

export default class Debug {
  active: boolean
  ui?: debug

  constructor() {
    this.active = window.location.hash == '#debug'
    if (this.active) {
      this.ui = new debug()
    }
  }
}
