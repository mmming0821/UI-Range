### 基于material design的HTML5 range控件
---
![image](https://github.com/mmming0821/UI-Range/blob/master/public/images/example.gif)

#### 运行:
```shell
$ npm install
$ npm run server

http://localhost:8080/test.html # 测试文件
http://localhost:8080/example.html # 项目中的实际应用例子
```

#### 打包:
```
npm run build
```

```shell
├──example  // 应用项目例子文件夹
├──range    // 开发文件夹
```

---
#### 使用：
```javascript
// 初始化一个UIRange控件
const rangeEle = document.querySelector('.range')
const obj = createUIRange(rangeEle, {
  min: 0,
  max: 3,
  step: 0.1,
  // 可选值:
  // 每一个step的距离
  stepHeight: 8, 
  // 初始化值
  initVal: 1,
  // 限制值,滑块仅允许在min~limitVal内滑动
  limitVal: 2.1,
  // 编号
  label: 7,
  // 滑动结束后调用
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
```
