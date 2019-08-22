Express


3. 路由

3.1. 路由的访问方式


3.2. 路由路径

3.3. 响应方法
    res.download()    提示下载文件。
    res.end()         终结响应处理流程。
    res.json()        发送一个JSON格式的响应。
    res.jsonp()       发送一个支持JSONP的JSON格式的响应
    res.redirect()    重定向请求。
    res.render()      渲染视图模板。
    res.send()        发送各种类型的响应。
    res.sendFile()    以八位字节流的形式发送文件。
    res.sendStatus()  设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。



4. 中间件

4.1. 中间件概念


4.2. express路由 具有的中间件特性


4.3. app.use()的特性

app.use() 就是一个中间件,与get()/post()..方法不用的是,
它的URL不是精确匹配,而是模糊匹配


4.4. app.use()使用


4.5. 静态资源服务的说明


4.6. 404 页面的说明

-----
5. 模版引擎,渲染页面

5.1. 模版引擎 的设置和使用

5.2. 原生的 end() 与express的 send() 的区别

5.3. 设置响应头 和 状态码 和 MIME类型



6. GET 与 POST

6.1 GET
GET请求的参数在URL中.
原生node中,要想得到get参数,需要借助于url模块来识别参数字符串.
在Express中，不需要使用url模块了.可以直接使用`req.query`对象得到GET参数

6.2 POST
GET请求的参数是隐蔽传参(在请求体中).
POST请求在Express中不能直接获得,必须使用`body-parser`模块.使用后,将可以用req.body得到参数.
但是如果表单中含有文件上传,那么还是需要使用`formidable`模块.


7. Express对数据库的支持

7.1 数据库集成

7.2 连接mysql数据库

7.3 使用数据库 - 查/增/改/删

7.4 连接池



----

8. Web Socket和Socket.IO框架

8.1. HTTP的问题

HTTP无法轻松实现 实时应用：
- HTTP协议是无状态的，服务器只会响应来自客户端的请求，但是它与客户端之间不具备持续连接。(无法长时持续连接)
- 我们可以捕获浏览器上发生的事件（比如用户点击了button），这个事件可以产生与服务器的数据交互（比如Ajax）。
但是，反过来却是不可能的：服务器端发生了一个事件，服务器无法将这个事件的信息实时主动通知它的客户端。只有在客户端查询服务器的当前状态的时候，所发生事件的信息才会从服务器传递到客户端。(无法主动输出信息)

但是,HTTP协议也能做聊天室这种'长连接'的东西,它是这么实现的:
- 长轮询：客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要轮询速度足够快，例如1秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举，实际上对服务器、客户端双方都造成了大量的性能浪费。
- 长连接：客户端只请求一次，但是服务器会将连接保持，不会返回结果（想象一下我们没有写res.end()时，浏览器的小菊花会一直转）。服务器有了新数据，就将数据发回来，又有了新数据，就将数据发回来，而一直保持挂起状态。这种做法的也造成了大量的性能浪费。

8.2. WebSocket

WebSocket协议能够让浏览器和服务器全双工实时通信，互相的，服务器也能主动通知客户端了。

- WebSocket的原理非常的简单：利用HTTP请求产生握手，HTTP头部中含有WebSocket协议的请求，所以握手之后，二者转用TCP协议进行交流（QQ的协议）。现在的浏览器和服务器之间，就是QQ和QQ服务器的关系了。
所以WebSocket协议，需要浏览器支持，更需要服务器支持。
- 支持WebSocket协议的浏览器有：Chrome 4、火狐4、IE10、Safari5
- 支持WebSocket协议的服务器有：Node、Apache Tomcat/7.0.27、Nginx1.3


8.3. Socket.IO

用原生Node搭建 WebSocket协议的服务 非常麻烦,我们使用写好的模块: Socket.IO
它屏蔽了所有底层细节，让顶层调用非常简单。
并且还为不支持WebSocket协议的浏览器(IE)，提供了长轮询的透明模拟机制。
Node的单线程、非阻塞I/O、事件驱动机制，使它非常适合Socket服务器。

官网：http://socket.io/


-----------------------------------
# chat_demo

## 初始化:

```
    npm init | 聊天室 | index.js
```

## 安装的组件:

```
    npm install express --save
    npm install ejs --save
    npm install socket.io --save
```

### 说明:
    Express与Socket.IO
    Express框架可以和Socket.IO搭配使用，但是不能像通常的Express程序那样，用app.listen进行监听了，而是采用一种固定的模式.

--------------

官方 画板 示例:
https://socket-io-whiteboard.now.sh/
官方 聊天室 示例:
https://socket-io-chat.now.sh/
官方socket.io 仓库:
https://github.com/socketio/socket.io
