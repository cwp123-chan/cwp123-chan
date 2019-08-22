---
category: Stuff
path: '/stuff'
title: 'setTimeoutandsetInterval'
type: 'GET'

layout: nil
---
# setTimeout  , setInterval

## 1.setTimeout与setInterval 的区别

- setTimeout 延迟一段时间执行一次 (Only one)；用clearTimeout()终止

  ```
  setTimeout(function(){··· }, n); // n毫秒后执行function	
  ```

- setInterval 每隔一段时间执行一次 (Many times)；用clearInterval()终止

  ```
  setInterval(function(){··· }, n); // 每隔n毫秒执行一次function
  ```



```
注：setTimeout和setInterval的回调函数，都是经过n毫秒后被添加到队列中，而不是过n毫秒后立即执行。
```



## 2. 浏览器?

**1、浏览器是个多进程应用**

```
Browser进程：浏览器的主进程（负责协调、主控），只有一个，作用：
​			负责浏览器界面显示，与用户交互。如前进，后退等
​			负责各个页面的管理，创建和销毁其他进程
​			将Renderer进程得到的内存中的Bitmap，绘制到用户界面上
​			网络资源的管理，下载等
```

```
第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建
```

```
GPU进程：最多一个，用于3D绘制等
```

```
浏览器内核（浏览器渲染进程，它内部是多线程的）**：默认每个Tab页面一个进程，互不影响。
```

#### 	2.浏览器内核中的多线程

```
GUI渲染线程
```

```
JS引擎线程：负责解析Javascript脚本，运行代码。
```

```
事件触发线程：归属于浏览器而不是JS引擎，用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助）
```

```
当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件线程中。
```

```
由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行）
定时触发器线程：因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确。计时完毕后，添加到事件队列中，等待JS引擎空闲后执行。
```

```
异步http请求线程
```

## 三、setInterval缺点 与 setTimeout

```
再次强调，定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。
```

```
setInterval(function, N)  
//即：每隔N秒把function事件推到消息队列中
```

```
上图描述;
setInterval每隔100ms往队列中添加一个事件；100ms后，添加T1定时器代码至队列中，主线程中还有任务在执行，所以等待，some event执行结束后执行T1定时器代码；又过了100ms，T2定时器被添加到队列中，主线程还在执行T1代码，所以等待；又过了100ms，理论上又要往队列里推一个定时器代码，但由于此时T2还在队列中，所以T3不会被添加，结果就是此时被跳过；这里我们可以看到，T1定时器执行结束后马上执行了T2代码，所以并没有达到定时器的效果。

综上所述，setInterval有两个缺点：

使用setInterval时，某些间隔会被跳过；
可能多个定时器会连续执行；
可以这么理解：每个setTimeout产生的任务会直接push到任务队列中；而setInterval在每次把任务push到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中)。

因而我们一般用setTimeout模拟setInterval，来规避掉上面的缺点。
```

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

## **四.setTimeout执行时：定时触发器线程、事件触发线程、JS引擎线程在干什么？**

​	每个setTimeout都由`定时触发器线程`负责计时，计时完毕后，添加到事件队列中(即：`事件触发线程`)，等待JS引擎线程空闲后，再来依次执行

## 五.为什么一秒后立即输出5个5？

首先JS引擎线程 要运行for循环，在每次循环中都会调用一个setTimeout函数，每个setTimeout计时结束后都会将其回调函数添加到 事件队列 中。等for循环结束后（即JS引擎线程空闲后），才开始按顺序执行事件队列中的函数。
每次循环都会在一秒后将回调函数添加到事件队列中，但由于两次相邻的循环时间是短到可以忽略不计的，所以表面看上去 一秒后立即执行了5次回调函数，即一秒后立即输出5个5。

当然为什么输出不是1到5，这个涉及到作用域的问题了，这里就不解释了。



## 六、setTimeout模拟setInterval

setTimeout模拟setInterval，也可理解为链式的setTimeout。

```
setTimeout(function () {
    // 任务
    setTimeout(arguments.callee, interval);
}, interval)
```



上述函数每次执行的时候都会创建一个新的定时器，第二个setTimeout使用了arguments.callee()获取当前函数的引用，并且为其设置另一个定时器。好处：

- `在前一个定时器执行完前，不会向队列插入新的定时器`（解决缺点一）
- 保证定时器间隔（解决缺点二）



```
警告：在严格模式下，第5版 ECMAScript (ES5) 禁止使用 arguments.callee()。当一个函数必须调用自身的时候, 避免使用 arguments.callee(), 通过要么给函数表达式一个名字,要么使用一个函数声明.
```



