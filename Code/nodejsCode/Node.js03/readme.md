Node.js

8. npm (node package management)

    这是一个工具名字.npm的主要职责是 安装开发包和管理依赖项.
    安装开发包:安装 `npm install`命令；更新 `npm update`命令.
    管理依赖项:借助 package.json 文件;最简单生成 package.json 的方法就是 `npm init`

    npm不需要单独安装,只要安装了 Node.js 环境,npm 就已经包含在里面了. 查看 npm 版本: `npm -v`

    为什么要使用npm?
    开发时,会使用到各种功能的组件,所有组件都由我们自己来写代码的话,开发效率就会很低.我们不要重复的去造轮子,要学会使用已有的工具,来完善我们的项目,站在巨人的肩膀上去工作.
    npm是js世界里的一个伟大的社区,能够让开发者更加轻松的共享代码和共用代码片段或模块组件.

    https://www.npmjs.com/   # npm官网
    https://npm.taobao.org/  # 淘宝npm镜像

    不要修改 [node_modules] + package-lock.json 这两个文件,因为它是使用npm去管理的

9. POST请求

    相比较GET请求，POST请求比较复杂。
    因为Node.js认为，使用POST请求时，数据量会比较多。
    为了追求极致的效率，它将数据拆分成为了众多小的数据块(chunk)，然后通过特定的事件，将这些小数据块有序传递给回调函数。

10. 文件上传处理

    原生写POST处理,比较复杂,要写两个监听.
    文件上传业务比较麻烦.所以,用第三方模块: `formidable`


11. ejs模版

    https://ejs.co/        #官网
    https://www.npmjs.com/package/ejs #npm上的ejs包
    ejs是Embedded JavaScript templates的简称,意思是嵌入式JavaScript模板.node中的后台模版.


----


Express

1. Express框架
基于 Node.js 平台，快速、开放、极简的 web 开发框架。
它是用于后台NodeJs的框架,与JQuery/Bootstrap/vue.js/AngularJs这类前端框架是不一样的!
Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。
丰富的 HTTP 快捷方法和任意排列组合的 Connect 中间件，让你创建健壮、友好的 API 变得既快速又简单。

对比原生Node.js
    使用原生Node.js开发,会发现有很多问题:
    - 呈现静态页面很不方便,需要处理每个HTTP请求,还要考虑304缓存问题.
    - 路由处理代码不直观清晰,需要写很多正则表达式和字符串函数.
    - 开发者不能集中精力写业务,要考虑很多其他的东西.

官网：http://expressjs.com/
中文官网：http://www.expressjs.com.cn/


2. 安装
npm install express --save  #即可安装最新版本的Express
- Express4.x与3.x版本的差别非常大，我们使用4.x

2.1. 基本使用


2.2. 路由处理


2.3. 对模版引擎的支持


2.4. 静态文件/目录处理


