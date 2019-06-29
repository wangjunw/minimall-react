# minimall-react

react+express 实现简单的小商城。包括登录、商品列表、购物车、订单等基本功能。

#### 技术栈

-   react 系列（react-router-dom、redux、styled-components）

-   node 服务端（express 框架）

-   mongodb 数据库（mongoose 库），删除数据、更新数据

> 之前的仿美团网用 vue 和 koa 写的，这次练习一下 react 和 express，而且商城模块是之前没有的，购物车的实现也不相同。

#### 超简单的商城完成

> 通过看教学视频大致把思路捋了一遍，然后一切都按最简单的来，主要是熟悉一下 react 和 express 的使用，以及商城的一个基本流程（当然真正的项目要复杂的多）。

#### 项目启动

1. 安装依赖

在项目根目录执行：

```
npm i
```

2. 启动本地 mongodb

3. 启动 node 服务

进入 server 目录下执行：

```
cd ./server
nodemon app.js
```

4. 启动前端项目

在项目根目录执行：

```
npm start
```
