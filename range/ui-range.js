import './material-range.scss'
import UIRange from './vertical'

const createUIRange = (element, options) => {
  const optionsRet = Object.assign({
    min: 0,
    max: 3,
    step: 0.1,
    stepHeight: 5 // 每一个step的距离
  }, options)
  return new UIRange(element, optionsRet)
}

window.createUIRange = createUIRange

export default createUIRange
