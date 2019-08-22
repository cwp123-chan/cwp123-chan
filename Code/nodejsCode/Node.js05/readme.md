
相册实例

目录结构
    [images]
        |-- controller
        |-- models
        |-- views
        |-- public
        |-- uploads
        |-- node_modules
        index.js             运行文件

初始化项目
    `npm init`
    将项目名称设置为: images  |  运行文件 index.js
安装框架/模块
```sh
    cnpm install express --save
    cnpm install ejs --save
    cnpm install formidable --save
    cnpm install body-parser --save
    cnpm install time-stamp --save
    cnpm install random-int --save
```

-----------------------------------------------

# chat_demo

## 初始化:

```
    npm init | 聊天室 | index.js
```

## 安装的组件:

```sh
    npm install express --save
    npm install ejs --save
    npm install socket.io --save
```

### 说明:
Express与Socket.IO
Express框架可以和Socket.IO搭配使用，但是不能像通常的Express程序那样，用app.listen进行监听了，而是采用一种固定的模式.

