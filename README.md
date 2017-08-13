#  🌰 Demo栗子 🌰

### 安装
- 准备FibJS环境，参考 <a href="http://fibjs.org/">http://fibjs.org </a>
- 初始化依赖
```sh
npm install
```

### 运行
```sh
chmod +x ./run
./run start
或者
cd src
fibjs index.js
```

### 浏览器预览
```html
浏览器访问 http://localhost:16060
```
---

### 功能说明
1. 支持热更新 ☀️
2. 支持子路由 ☀️
3. 支持多种数据库和连接池 (😂采用fib-pool嘛)  ☀️
4. 支持session(部分)  ☀️
5. 支持配置文件读取(可注释的json文件)  ☀️
6. TODO 打包编译为jsc 🌧️
7. TODO Self-Zip打包exe  🌧️
8. TODO Vue前端脚手架  🌧️️

---

### 目录结构
```sh
目录结构
|-- build           #build目录
|-- config          #配置文件
|-- logs            #日志文件
|-- node_modules    #node_modules
|-- src             #source
|  |-- service      #服务
|  |-- test         #测试
|  |-- index.js     #index.js
|-- test            #测试目录
|-- run             #app脚本
```

---

### 开发
- 参考service/web.js和test/web.js 增加自己的router
- 更多内容参考 <a href="http://fibjs.org/">http://fibjs.org </a>
