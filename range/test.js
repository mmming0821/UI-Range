import './test.scss'
import createUIRange from './ui-range'

const rangeEle = document.querySelector('.range')
const obj = createUIRange(rangeEle, {
  min: 0,
  max: 3,
  step: 0.1,
  stepHeight: 8, // 每一个step的距离
  // 可选值
  initVal: 1, // 初始化值
  limitVal: 2.1, // 限制值,滑块仅允许在min~limitVal内滑动
  label: 7, // 编号
  changed: function () {
    console.log(this.val)
  }
})

setTimeout(() => {
  // 更新当前值
  obj.updateVal(0.2)
  // 更新限制值
  obj.setLimitVal(1)
}, 2000)
