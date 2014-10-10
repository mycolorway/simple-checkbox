# Simple Checkbox

Simple Checkbox 是一个继承自[Simple Module](https://github.com/mycolorway/simple-module)的组件，同时依赖于JQuery。

#### 初始化
通过`simple.checkbox(opts)`来初始化checkbox组件，其中

`opts ＝ {
  el: [String]
}`

el是一个字符串，为需要初始化的input的selector, 同时这个函数返回一个Checkbox对象。

#### Checkbox对象方法

`check([Boolean])` 设定checkbox的与否选中

`disable()` 禁用Checkbox

`enable()` 启用Checkbox

`destroy()` 撤销对input进行的任何修改