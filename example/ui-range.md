```js
var range = new UIRangeView()

// 初始化数据，可传JSON参数，不传则使用默认初始化数据
range.initRange()
// 获取当前数据的JSON字符串
range.getData()

// 设置初始化数据
range.setInitData({'0': 1})
// 显示弹出层
range.showModal()
// 隐藏弹出层
range.hideModal()
```