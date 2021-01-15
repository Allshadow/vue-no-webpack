### 为什么不能用

<!-- 有时候我们在父组件中给子组件加点内容，满足开发需要。所以就想着以下做法 -->

假设 我们现在已经建好 nav-head 并引入了组件， 每次引用的时候传递不同的内容。

有时候我们会冲动的有以下写法：
```
  <nav-head>我是 slot</nav-head>
  
```
运行后会发现并不起效果。

vue 官方写到，如果<nav-head> 的 template 中没有包含一个 <slot> 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃

所以，我们在子组件 nav-head 中加入， slot

父级组件

```
  <nav-head>我是 slot</nav-head>
```

NavHead 组件
```
  <div class="nav-head">
    <slot></slot>
  </div>
```

当组件渲染的时候，<slot></slot> 将会被替换为 “我是 slot”


### 插槽 slot

#### 定义

实现内容分发

#### 作用域

插槽的作用域是在父级，访问不到 <nav-head> 的作用域

##### vue 规则：

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

#### 设置默认

如果父级没有传递内容的时候，<slot></slot> 标签内的内容会默认展示出来

父级组件
```
  <nav-head></nav-head>
```

NavHead 组件
```
  <div class="nav-head">
    <slot>我是默认值</slot>
  </div>
```

### 默认 slot

#### 基本结构

父级组件
```
  <nav-head>我是 slot</nav-head>
```

NavHead 组件
```
  <div class="nav-head">
    <slot></slot>
  </div>
```

#### 特点

1. 一个 template 标签中单个 slot 只能存在一个
2. slot="default" 忽略不写

### 具名 slot

#### 描述

在 slot 标签中加入 name 属性，使得父级可以将内容插入对应的位置中

2.6 版本前的语法

#### 基本结构

父级，在 <template> 或者直接在普通元素上使用特殊的 slot

```
  <nav-head>
    <template slot="nav">
      <div>我是 slot</div>
    </template>
    <!-- 或者 -->

    <div slot="nav">我是 slot</div>
  </nav-head>
```

NavHead 组件
```
  <div class="nav-head">
    <slot name="nav"></slot>
  </div>
```

2.6 版本及之后

#### 版本更改语法

1. 将 slot 废弃掉 更新了 v-slot 语法
2. v-slot 只能添加在 template 上,有一种例外 (当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用)

#### 基本结构

父级

```
  <nav-head>
    <template v-slot:nav>
      <div>我是 slot</div>
    </template>
  </nav-head>
```

### 作用域插槽 （slot-scope）

2.6 版本前的语法

#### 注意

1. slot-scope 值可以随便定义 slot-scope="xxx"
2. slot-scope="xxx", 里面是把 slot 上所有的 v-bind: xxx 属性以对象 {} 的方式传给父组件使用
2. 默认 slot 的 slot="default" 可以忽略不写

#### 基本结构

父级

```
  <nav-head>
    <template slot="nav" slot-scope="scope">
      <div>{{scope}}</div>
    </template>
    <!-- 或者 -->

    <div slot="nav" slot-scope="scope">{{scope}}</div>
  </nav-head>

  scope = {
    data: {
      key: 123
    },
    prop: data
  }
```

NavHead 组件
```
  <div class="nav-head">
    <slot name="nav" :data="{key: 123}" prop="data"></slot>
  </div>
```

#### slot-scope 解构

可以使用 es6 中解构赋值方式进行解构数据,数据如上面基本结构

父级

```
  <nav-head>
    <div slot="nav" slot-scope="{ data prop}">{{scope}}</div>
  </nav-head>
```

2.6 版本及之后的语法

#### 更新语法

1. 将 slot-scope 废弃使用 v-slot:default="xxx"

#### 将不带参数的 v-slot 假定为对应的默认 slot

1. 可以使用 v-slot="slotProps" 替代 v-slot:default="slotProps"
2. 有多个 slot 的时候，不能将 v-slot 添加到标签上

<nav-head v-slot="slotProps">
  {{ slotProps.data.key }}
</nav-head>

#### 解构语法

解构

<nav-head v-slot="{ prop }">
  {{ user.firstName }}
</nav-head>

重命名(将 prop 重命名 为 newNme)

<nav-head v-slot="{ prop: newName  }">
  {{ user.firstName }}
</nav-head>

定义默认参数

<nav-head v-slot="{ prop = 122 }">
  {{ user.firstName }}
</nav-head>

### 动态插槽名

还不知道如何使用

<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>

具名插槽语法糖

1. v-slot:default  #default 直接写 # 没有效果
2. v-slot:xx       #xx
