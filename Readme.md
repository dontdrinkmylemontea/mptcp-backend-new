<img src="./system.png">

## 启动方法：服务端+客户端

1. 开发环境：
   `npm run server` 和 `npm run client`
1. 生产环境：
   `npm run buildS` 和 `npm run buildC`

## 配置说明

_以下提到的文件位置都是绝对位置_

客户端服务端都需要配置：

1. ping 地址数组： src/util/util.js pingAddrs

### 服务端

1. 开机脚本位置： src/server/init.js initScriptPath
1. 结果文件存储位置： src/server/result.js filePath

### 客户端

1. 测试脚本位置： src/client/runtest.js SCRIPT_PATH
1. 测试脚本文件名： src/client/runtest.js SCRIPT_Name

## 接口返回格式

```json
{
  "errorCode": 0, // 0为正常， -1为不正常
  "data": {}
}
```

## 接口说明

### conf_server

conf_server 是客户端服务器，部署在客户端。用于配置客户端的 scheduler, congestion, 脚本参数以及向服务端发送测试请求。除特殊标注外所有请求都是 GET 请求

- /config

  客户端配置参数

  | 参数名     | 备注                                  | 是否必须 | 默认值  |
  | ---------- | ------------------------------------- | -------- | ------- |
  | scheduler  | mptcp sheduler, 可选 default,自定义等 | 是       | -       |
  | congestion | 拥塞控制算法名称                      | 否       | default |

- /pinging

  检查服务器是否能 ping 通其他机器， ip 地址可在服务器代码 conf_server.js 中配置， 修改 pingAddrs 即可。

- /runtest

  客户端配置参数

  | 参数名   | 备注                                                               | 是否必须 |
  | -------- | ------------------------------------------------------------------ | -------- |
  | name     | 本次测试的名称                                                     | 是       |
  | objsize  | 对应 ruby 脚本中的 objsize 变量， 字符串，以','分隔开。文件大小    | 是       |
  | bdvar    | 对应 ruby 脚本中的 bdvar 变量， 字符串，以','分隔开。带宽          | 是       |
  | limitvar | 对应 ruby 脚本中的 limitvar 变量， 字符串，以','分隔开。路由器缓存 | 是       |
  | repnum   | 对应 ruby 脚本中的 repnum 变量。并发流数目                         | 是       |
  | rttvar1  | 对应 ruby 脚本中的 rttvar1 变量。                                  | 是       |

  请求类型：POST
  执行脚本

### test_server

test_server 是服务端服务器，部署在服务端。负责服务端网络测试、服务端开机后执行开机脚本、服务端算法配置、测试结果查询

- /pinging

  检查服务器是否能 ping 通其他机器， ip 地址可在服务器代码 test_server.js 中配置， 修改 pingAddrs 即可。

- /init

  服务器重启后需要运行开机脚本。脚本地址可通过修改 START_TEST_ADDR 变量改变。

- /config

  服务端配置参数

  | 参数名      | 备注                                  | 是否必须 |
  | ----------- | ------------------------------------- | -------- |
  | scheduler   | mptcp sheduler, 可选 default,自定义等 | 是       |
  | congetstion | 拥塞控制算法名称                      | 是       |

- /result

  在服务端查询测试结果
