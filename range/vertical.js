import Base from './base'

class UIRange extends Base {
  constructor (element, options) {
    super(element, options)
    this.initVerticle()
    this.mouseMouveBind = this.mouseMouve.bind(this)
    this.mouseUpBind = this.mouseUp.bind(this)
  }
  initVerticle () {
    // 初始化元素样式
    this.initStyle()
    // 滑动区域高度
    // this.restrictHandleY = this.slider.offsetHeight - this.handle.offsetHeight
    this.restrictHandleY = this.slider.offsetHeight
    // 平均每一份的px值
    this.averageOffsetY = this.restrictHandleY / (this.range / this.options.step)
    // 初始化值
    const {
      initVal = 0,
      limitVal
    } = this.options
    if (!isNaN(initVal)) this.updateVal(initVal)
    if (!isNaN(limitVal)) this.setLimitVal(limitVal)
  }
  initStyle () {
    // 设置高度，添加DOM
    const { step, stepHeight } = this.options
    const height = this.range / step * stepHeight
    this.slider.style.height = height + this.handle.offsetHeight + 'px'
  }
  mouseDown (e) {
    this.startY = e.clientY
    this.handleOffsetY = parseInt(this.handle.style.bottom) || 0
    document.addEventListener('mousemove', this.mouseMouveBind)
    document.addEventListener('mouseup', this.mouseUpBind)
  }
  mouseMouve (e) {
    this.bottomOffsetY = this.startY - e.clientY
    let clacY = this.bottomOffsetY + this.handleOffsetY
    if (clacY < 0) {
      clacY = 0
    } else if (clacY >= this.restrictHandleY) {
      clacY = this.restrictHandleY
    }
    if (!isNaN(this.limitOffsetY) && clacY >= this.limitOffsetY) {
      clacY = this.limitOffsetY
    }

    // 当前滑动的份数
    const remainderY = Math.round(clacY / this.averageOffsetY)
    // const remainderY = Number((clacY / this.averageOffsetY).toFixed(2))
    clacY = remainderY * this.averageOffsetY
    this.setStyle(clacY)
    this.setValue(clacY, this.restrictHandleY)
    this.setMaxClass()
  }
  mouseUp () {
    this.options.changed && this.options.changed.call(this)
    document.removeEventListener('mousemove', this.mouseMouveBind)
    document.removeEventListener('mouseup', this.mouseUpBind)
  }
  setStyle (value) {
    this.handle.style.bottom = value + 'px'
    this.slider.querySelector('.ui-range-quantity').style.height = value + 'px'
  }
  getPositionY (value) {
    const copies = Math.round(value / this.options.step)
    const clacY = Number((copies * this.averageOffsetY).toFixed(2))
    return clacY
  }
  // 到达max值时添加class: 'isMax'
  setMaxClass () {
    const limitVal = this.limitVal
    let maxVal = this.options.max
    if (~limitVal) {
      maxVal = limitVal
    }
    if (this.val >= maxVal) {
      this.addClass(this.slider, 'isMax')
    } else {
      this.removeClass(this.slider, 'isMax')
    }
  }
  updateVal (value) {
    const clacY = this.getPositionY(value)
    this.setMaxClass(clacY)
    this.setStyle(clacY)
    this.setValue(clacY, this.restrictHandleY)
  }
  setLimitVal (value) {
    if (isNaN(value)) {
      throw Error('传入数据有误')
    }
    value = Number(Number(value).toFixed(3))
    value = value > this.options.max ? this.options.max : value
    if (value < this.val) {
      value = this.val
    }
    this.limitOffsetY = this.getPositionY(value)
    this.limit = this.slider.querySelector('.ui-range-limit')
    this.limitValue = this.limit.querySelector('.ui-range-limit-value')
    this.limitValue.innerText = value
    this.limit.style.bottom = this.limitOffsetY + 'px'
    this.limitVal = value
    this.setMaxClass()
  }
}

export default UIRange
