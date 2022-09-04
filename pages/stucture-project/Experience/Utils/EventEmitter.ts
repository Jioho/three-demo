export default class EventEmitter {
  callbacks: {
    [name: string]: {
      [name: string]: any[]
    }
  }

  constructor() {
    this.callbacks = {
      base: {}
    }
  }

  on(_names: string, callback: Function) {
    const that = this

    if (typeof _names === 'undefined' || _names === '') {
      throw new Error('wrong names')
    }

    if (typeof callback === 'undefined') {
      throw new Error('wrong callback')
    }

    const names = this.resolveNames(_names)

    names.forEach(function (_name) {
      const name = that.resolveName(_name)

      // 优化，给callbacks绑定新的值？
      // 创建命名空间
      if (!(that.callbacks[name.namespace] instanceof Object)) {
        that.callbacks[name.namespace] = {}
      }

      // 创建回调函数
      if (!(that.callbacks[name.namespace][name.value] instanceof Array)) {
        that.callbacks[name.namespace][name.value] = []
      }

      // Add callback
      that.callbacks[name.namespace][name.value].push(callback)
    })

    return this
  }

  off(_names: string) {
    const that = this

    if (typeof _names === 'undefined' || _names === '') {
      throw new Error('wrong names')
    }

    const names = this.resolveNames(_names)

    names.forEach(function (_name) {
      const name = that.resolveName(_name)
      if (name.namespace !== 'base' && name.value !== '') {
        delete that.callbacks[name.namespace]
      } else {
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in that.callbacks) {
            if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
              delete that.callbacks[namespace][name.value]

              // Remove namespace if empty
              if (Object.keys(that.callbacks[namespace]).length === 0) delete that.callbacks[namespace]
            }
          }
        } // Specified namespace
        else if (that.callbacks[name.namespace] instanceof Object && that.callbacks[name.namespace][name.value] instanceof Array) {
          delete that.callbacks[name.namespace][name.value]

          // Remove namespace if empty
          if (Object.keys(that.callbacks[name.namespace]).length === 0) delete that.callbacks[name.namespace]
        }
      }
    })
  }

  trigger(_name: string, _args: any[] = []) {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      throw new Error('wrong name')
    }

    const that = this
    let finalResult: null = null
    let result = null

    // Resolve names (should on have one event)
    let names = this.resolveNames(_name)

    // Resolve name
    let name = this.resolveName(names[0])

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in that.callbacks) {
        if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
          that.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(that, _args)

            if (typeof finalResult === 'undefined') {
              finalResult = result
            }
          })
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name')
        return this
      }

      that.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(that, _args)

        if (typeof finalResult === 'undefined') finalResult = result
      })
    }

    return finalResult
  }

  resolveNames(_names: string): string[] {
    let names = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    return names.split(' ')
  }

  resolveName(name: string) {
    const newName = {
      original: '',
      value: '',
      namespace: ''
    }
    const parts = name.split('.')

    newName.original = name
    newName.value = parts[0]
    newName.namespace = 'base' // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1]
    }

    return newName
  }
}
