export default class Base {
  constructor (element, options) {
    this.element = element
    this.options = options
    if (this.element !== null) this.init()
  }
  init () {
    let {
      min,
      max,
      initVal,
      limitVal
    } = this.options
    if (isNaN(min) || isNaN(max)) {
      throw Error('JSON数据格式有误')
    }
    this.range = max - min
    if (initVal > max) initVal = max
    Object.assign(this.options, {
      max: Number(max),
      min: Number(min),
      initVal: Number(initVal),
      limitVal: Number(limitVal)
    })
    this.append()
    this.handle = this.element.querySelector('.ui-range-handle')
    this.bindEvents()
    this.setRange(this.options)
  }
  hasClass (elem, className) {
    if (~elem.className.split(/\s+/).indexOf(className)) {
      return true
    }
    return false
  }
  addClass (elem, className) {
    if (!this.hasClass(elem, className)) {
      elem.className = elem.className + ' ' + className
    }
  }
  removeClass (elem, className) {
    if (this.hasClass(elem, className)) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      elem.className = elem.className.replace(reg, '')
    }
  }
  append () {
    const fragment = document.createDocumentFragment()
    this.value = this.create({
      tag: 'div',
      className: 'ui-range-value',
      innerText: 0
    })
    fragment.appendChild(this.value)
    this.slider = this.generate()
    fragment.appendChild(this.slider)
    if (~this.options.label) {
      this.label = this.create({
        tag: 'div',
        className: 'ui-range-label',
        innerText: this.options.label
      })
      fragment.appendChild(this.label)
    }
    this.element.appendChild(fragment)
  }
  create (obj) {
    const {
      tag,
      className,
      innerText = ''
    } = obj
    const elem = document.createElement(tag)
    elem.className = className
    elem.innerText = innerText
    return elem
  }
  generate () {
    const elems = {
      handle: {
        tag: 'span',
        className: 'ui-range-handle'
      },
      quantity: {
        tag: 'span',
        className: 'ui-range-quantity'
      },
      min: {
        tag: 'span',
        className: 'ui-range-min'
      },
      max: {
        tag: 'span',
        className: 'ui-range-max'
      }
    }
    if (!isNaN(this.options.limitVal)) {
      Object.assign(elems, {
        limit: {
          tag: 'div',
          className: 'ui-range-limit',
          children: {
            tag: 'div',
            className: 'ui-range-limit-value'
          }
        }
      })
    }
    const slider = this.create({
      tag: 'div',
      className: 'ui-range-bar'
    })
    Object.keys(elems).forEach(key => {
      const tempElem = this.create(elems[key])
      if (elems[key].children) tempElem.appendChild(this.create(elems[key].children))
      slider.appendChild(tempElem)
    })
    return slider
  }
  setRange ({ min, max }) {
    this.slider.querySelector('.ui-range-min').innerText = min
    this.slider.querySelector('.ui-range-max').innerText = max
  }
  bindEvents () {
    this.handle.addEventListener('mousedown', this.mouseDown.bind(this))
  }
  setValue (offsetVal, size) {
    const {
      min,
      max,
      step
    } = this.options
    let value = offsetVal / size * (max - min) / step * step
    const stepStr = step + ''
    const fixedNum = ~stepStr.indexOf('.') ? stepStr.split('.')[1].length : 0
    value = Number(value.toFixed(fixedNum)) + min
    if (this.value.innerText - 0 !== value) {
      this.value.innerText = value
    }
    this.val = value
  }
}
