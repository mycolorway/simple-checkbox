# Simple Checkbox

[![Circle CI](https://circleci.com/gh/mycolorway/simple-checkbox.png?circle-token=7653cca322502ed59d77d3196a6ee007cf404617)](https://circleci.com/gh/mycolorway/simple-checkbox)

一个简单的Checkbox组件。

依赖项：

- JQuery 2.0+
- [Simple Module](https://github.com/mycolorway/simple-module)

### 使用方法
首先，需要在页面里引用相关脚本以及css

```html
<link media="all" rel="stylesheet" type="text/css" href="path/to/checkbox.css" />
<script type="text/javascript" src="path/to/jquery.min.js"></script>
<script type="text/javascript" src="path/to/module.js"></script>
<script type="text/javascript" src="path/to/checkbox.js"></script>

```

通过checkbox方法，实例化Checkbox对象

```
<input type="checkbox" id="checkbox">


simple.checkbox({
  el: '#checkbox'
});

```

### API 文档

####初始化选项

__el__

checkbox的选择器，必选

__size__

checkbox的大小，如果留空，则为默认的18px

__animation__

是否在点击时发生动画效果，默认为false

#### 方法

__check(checked)__ Boolean 

控制checkbox选中与否

__disable()__ 

禁用这个checkbox

__enable__

启用这个checkbox

__destroy()__

销毁checkbox对象，还原初始环境