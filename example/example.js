import createUIRange from '../range/ui-range'
import './example.scss'

class RangeView {
  constructor (data) {
    this.data = data
    this.ranges = []
    this.total = 24
  }
  initRange (data) {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    this.renderRange(data)
    this.changed(this, true)
  }
  renderRange (data) {
    const self = this
    document.querySelector('.range-wrap').innerHTML = ''
    document.querySelector('.range-offset-text').innerHTML = 0
    Object.keys(data).forEach((key, index) => {
      const ele = document.createElement('div')
      ele.className = 'ui-range'
      document.querySelector('.range-wrap').appendChild(ele)
      const range = createUIRange(ele, {
        min: 0,
        max: 3,
        step: 0.1,
        stepHeight: 5, // 每一个step的距离
        // 可选值:
        initVal: data[key], // 初始化值
        limitVal: data[key],
        label: key,
        changed: function () {
          self.changed.call(this, self)
        }
      })
      range.index = index
      self.ranges.push(range)
    })
  }
  changed (self, isInit) {
    const currentTotal = self.getTotal()
    let changeVal = self.total - currentTotal
    changeVal = Number(changeVal.toFixed(3))
    for (let i = 0, len = self.ranges.length; i < len; i++) {
      const range = self.ranges[i]
      if (isInit) {
        range.setLimitVal(range.val + changeVal)
      } else if (i !== this.index) {
        range.setLimitVal(range.val + changeVal)
      }
    }
    self.setOffsetText(changeVal)
    self.setTotal(currentTotal)
  }
  getTotal () {
    let total = 0
    for (let i = 0, len = this.ranges.length; i < len; i++) {
      total += this.ranges[i].val
    }
    return Number(total.toFixed(3))
  }
  setTotal (val) {
    document.querySelector('.range-total-text').innerText = val
  }
  getData () {
    const data = {}
    for (let i = 0, len = this.ranges.length; i < len; i++) {
      const range = this.ranges[i]
      data[range.index] = range.val
    }
    return data
  }
  setOffsetText (val) {
    const offsetEle = document.querySelector('.range-offset-text')
    if (offsetEle) {
      offsetEle.innerText = val
    }
  }
}

class UIRangeView {
  constructor () {
    this.initData = {'0': 0.5, '1': 0.5, '2': 0.5, '3': 0.2, '4': 0.2, '5': 0.2, '6': 0.5, '7': 0.6, '8': 1, '9': 1, '10': 1.2, '11': 1.4, '12': 1, '13': 1.5, '14': 2, '15': 2, '16': 2, '17': 1, '18': 1, '19': 1.2, '20': 2, '21': 1, '22': 1, '23': 0.5}
    this.init()
  }
  init () {
    this.bindEvents()
  }
  bindEvents () {
    const JSONButton = document.querySelector('.range-input-button')
    const JSONInput = document.querySelector('.range-input-inp')
    const rangeWrap = document.querySelector('.range-wrap')
    if (JSONButton && JSONInput) {
      JSONButton.addEventListener('click', () => {
        rangeWrap.innerHTML = ''
        const JSONVal = JSONInput.value.replace(/'/g, '"')
        if (JSONVal) {
          this.initRange(JSON.parse(JSONVal))
        } else {
          this.initRange()
        }
      })
    }
    const confirmBtn = document.querySelector('.range-btn-confirm')
    // 确认
    confirmBtn.addEventListener('click', () => {
      window.alert(this.getData())
      this.hideModal()
    })
    // 重置
    const resetBtn = document.querySelector('.range-btn-reset')
    resetBtn.addEventListener('click', () => {
      this.initRange()
    })
    // 取消
    const cancelBtn = document.querySelector('.range-btn-cancel')
    cancelBtn.addEventListener('click', () => {
      this.hideModal()
    })
    const showBtn = document.querySelector('.range-input-button')
    showBtn.addEventListener('click', () => {
      this.initRange()
    })
  }
  initRange (datas = this.initData) {
    if (typeof datas === 'string') {
      datas = JSON.parse(datas)
    }
    if (document.querySelector('.range-mask').style.display != 'display') {
      this.showModal()
    }
    this.rangeView = new RangeView()
    this.rangeView.initRange(datas)
  }
  // 获取当前数据JSON字符串
  getData () {
    return JSON.stringify(this.rangeView.getData())
  }
  setInitData (data) {
    if (typeof datas === 'string') {
      data = JSON.parse(data)
    }
    this.initData = data
  }
  showModal () {
    const maskEle = document.querySelector('.range-mask')
    maskEle.style.display = 'block'
  }
  hideModal () {
    const maskEle = document.querySelector('.range-mask')
    maskEle.style.display = 'none'
  }
}

window.UIRangeView = UIRangeView

new UIRangeView()
