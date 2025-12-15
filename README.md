# 新闻网站启动与部署文档

## 框架基础信息

- 框架名称：NextJs
- 框架版本：16.0.10
- 框架特殊功能： 客户端渲染(Client-side Rendering) 或者 服务器端渲染 (Server-side Rendering) （默认服务器端渲染）
- 框架官方链接： [NextJs official docs link access](https://nextjs.org/)
- 框架编程语言： Javascript, Typescript
- 核心内置引擎： NodeJs

## 前提准备好服务器环境

1. 您服务器还是本地电脑必选提前装好 `NodeJs` 运行时引擎，因为框架完整依靠这个运行时
2. 接下来，您得安装 `yarn CLI` 工具，执行指令时要用到

## 如何配置与启动开发以及生产环境

- 【**第一步**】： 在您本地设备将项目源代码下载，然后提取项目（使用 `Git` 不必提取了）
- 【**第二步**】： 打开项目的根目录了解一下整个目录架构，然后配置下 **`.env`** 文件，若项目没有的话，那在根及目录创建一个 **`.env`** 文件吧
- 【**第三步**】： 有了 **`.env`** 下来，将下面的所有项目配置放到您 **`.env`** 文件里面去

```
  # 环境模式 ： development | production
  NODE_ENV=production

  # 前端公开链接
  NEXT_PUBLIC_URL=http://localhost:3000 或 http://127.0.0.1:3000

  # 后端集成链接
  NEXT_PUBLIC_API_URL=
  NEXT_API_URL=
```

- 【**第四步**】： 安装项目用的依赖，打开您 `terminal`，`bash` 操作台 运行下面指令

```
  yarn 或 yarn install
```

- 【**第五步**】： 格式化源代码，运行下面指令 （可以跳过）

```
  yarn format
```

- 【**第六步**】： 检查项目所有依靠的包有没有 Bug，漏洞 或者 病毒，运行下面指令

```
  yarn audit 以及 yarn audit --fix
```

> ⚠ 有漏洞发现赶紧找项目的负责人尽量解决本道问题，联系到@Minghua

- 【**第七步**】： 打包项目，运行下面指令

```
  yarn build

```

- 【**最后**】： 现在您拥有两个环境可以启动 【1.开发环境 (development)， 2.生产环境 (production)】

  - 在【1.开发环境 (development)】启动的话，那就按下面指令运行下去

  ```
  yarn dev
  ```

  👉 默认开放 3000 端口

  - 在【2.生产环境 (production)】启动的话，那就按下面指令运行下去

  ```
  yarn start
  ```

  👉 默认开放 3000 端口

  - 按流程执行后，最终输出访问链接如下

  ```
  🔗 http://localhost:3000 或 http://127.0.0.1:3000
  ```

## 其他说明

- NextJs 框架打包完之后，它的输出打包文件不如其他框架通常提供（html, css, js）文件，反而 NextJs 提供的是框架本身的打包文件或目录。您运行打包指令完，就会发现添加新一个(.next)目录, 这个是 NextJs 打包后目录的。为了启动程序，您必须执行上面提的指令，看【最后部】。
