# 体会心得

* 本次作业使用了reactjs进行开发，与此前开发具体不同的是组件化，以及数据组织情况，需要使用react将作业组件化，同时需要注意组件间的数据传输
* 框架让开发变得套路起来，但是遵循既定的编程方式也是具有难度的，react和vue还是有很大差别的，使用react开发感觉更接近原生js，现将遇到的问题罗列如下：
  
  
1. 原本是想使用window.beforeunload()来监听页面关闭，同时存储数据的，但是我发现在这个生命周期钩子发生的时候，react组件的state已经被销毁了，这也就意味着在 beforeunload() 发生的时候读取state为空，因此没办法在这个时候将数据存储到本地，最后改为输入后就存储一次。
   
2. 直接在 onclick （或者类似的函数，如 onMouseDown 等等）中直接绑定也即：onclick={func} 有时候会触发如下图所示的多次页面更新从而导致控制台报过多次 render() 的错误，这时候需要使用 onclick={()=>func()} 防止过多次的 render。
   ```
   Too many re-renders. React limits the number of renderers to prevent an infinite loop
   ```
   
3. react 使用 img 标签的时候 src 之中不能是表达式而应该是一个确切的字符串，由于图片的src是可变化的，所以需要使用变量，先尝试了使用直接 const path = require('...') 然后将 path 放到 src 里面，但是测试之后不能使用，然后通过引入 ts 模块声明文件 images.d.ts 使得图片能够被识别为模块，同时引入对应的 webpack 的 loader ，之后直接在上方以模块方式引入图片，插入到 src 之中。
   ```
   也可以使用 state 来存储图片的 src ，在点击之后修改 state 就好了
   ```
   
4. dayjs 想要解析带有中文的字符串时需要让 dayjs 本身继承 customParseFormat ，写的时候由于没有考虑到生成的 dayjs 对象有可能是 null ，浪费了一些时间。
   
5. js 具有和 java 类似的比较器类似的功能，让我们在 Array.sort(new Comparator()) 之中方便的进行比较器编程，然后利用其对任意类型的 array 排序。

6. reactjs 可以在组件间传递数据的时候传送函数，在父组件中定义修改自己组件状态的方法，将其传给子组件，就能够在子组件中更改父组件的状态，而父组件的状态又会影响子组件的状态。

7. 在利用 map 生成 todolist 的时候需要给每个元素给一个 key 值，但是一定不能用 index 作为 key ,因为 react 是虚拟 dom ，如果以 Index 为 key ， react 将依顺序对应 todolist 中的 item ，也就是说，假设 a 现在在第一个，点击 a 使其成为已完成之后， a 将被排序算法拍到下边（上边未完成，下边已完成），完成之后假设此时排在第一个的是 b ，那么 b 此时的虚拟 dom （使用react devtool跟踪到的）将和真实的 dom 不匹配， react 将会认为真实的 b 对应到的虚拟 dom 是 a ,因为此时 b 排在第一个，而虚拟  dom 之中的 index = 1 的地方是 a ，也就导致了如果想再次点击b使其成为已完成，由于此时虚拟 dom 之中对应的是已完成，点击之后变成未完成，将会没有变化，解决方法就是不要用  index 作为 key ，我索性使用了 uuid() 作为 key 。react以虚拟dom的方式变得更加快速，但是也带来了需要考虑真实 dom 和虚拟 dom 不匹配的问题。


8. 在开发时遇到了下列的问题，开始的时候一直没有改好，后来感觉应该是组件之间嵌套的方法太多了，因此直接换了一种实现方法，该报错消失
   ```
   Warning: Cannot update a component (`ReportComponents`) while rendering a different component (`...`). To locate the bad setState() call inside `...`, follow the stack trace as described in
   ```

9.  由于排序的时候是根据时间来排序的，而该项目中的时间的最小值是秒，因此添加了一个定时器以及state，使得无法在一秒内添加两个，确保排序的时候不会出现两个时间一样的而无法正确排序的现象。而且正常应用的过程中感觉也不会有人一秒内加那么多次任务。
  

This project has been created using **webpack-cli**, you can install dependencies by run 

```
npm install
```


you can now run project by run

```
npm run dev
```


to build project you can run

```
npm run build
```

