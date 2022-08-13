
### 1. http1.1特点
> 支持长连接,支持多路复用,使用一个TCP通道来发送多个请求,根据浏览器区别,每个域名支持连接6个TCP通道,同时发起6个请求,但是请求时延会发生队头阻塞,只有当前请求响应或者超时,才会发送下一个请求

### 2.http2特点
- 头部压缩 HPACk 算法
- 废除起始行，将起始行中的请求方法、URI、状态码转换成了头字段

### 2. 表单格式Content-Type
- application/x-www-form-ur lencoded:通过表单标签发送,使用URL编码,浪费资源
- multipart/form-data: 通过 new FormData 发送数据,通过 `boundary`来分割每一个表单数据(常用)

### 3. 优化对头阻塞的
每个域名支持连接6个TCP通道,所以我们可以创建多个子域名,这样每个域名可以创建6个tcp连接,提高了请求的并发量

### 4. Cookie
- Domain: 默认为源主机地址,**不包含子域名**,也就默认不会给子域名携带Cookie
- path: 用来配置访问cookie路径
- HttpOnly: 禁止使用js访问cookie
- Expirse: 过期时间
- max-age: 段时间
- SameSite: 控制cookie 在跨域中是携带
  - strict: 严格禁止第三方访问cookie
  - Lax: 允许get, a, 访问cookie 

### 5. Cache-Control不发送请求
- no-store: 每次请求都必须向服务器请求,不允许使用缓存
- no-cache: 缓存,但是必须发送请求重新验证,因此该字段必须携带判断是否过期相关字段
- public: 任何中间代理都可以缓存
- private: 只有用户客户端可以缓存
- max-age: 优先级最高,设置为强缓存

### 6. 协商缓存发送请求
- ETag/If-None-Match: 判断是否相同来确定是否使用缓存
- Last-Modified/If-Modified-Since: 

### 7. 跨域
跨域是浏览器的一种同源策略，浏览器会检测发送请求的源地址与响应的源地址是否相同，不同则属于跨域，默认跨域是不允许携带 cookie 的
#### 携带cookie
- client:
- server:  Access-Control-Allow-Credentials
#### **解决跨域**
配置跨域的响应头解决跨域：
- Access-Control-Allow-Origin: 控制跨域可以访问的源
- Access-Control-Allow-methods: 控制跨域可以访问的方法

使用JSONP 方式： script，img \
使用 Nginx 反向代理

### 8. Tcp 五层协议
- 应用层
- 传输层    tcp/udp  将目标端口和源端口添加到报文中
- 网络层   ip 目标ip和源ip
- 数据链路层
- 物理层


### 8. http 组成
- 发送请求
  - 请求行：请求方法，请求url，http版本
  - 请求头：Accept-Type,Accept-Encoding,host,origin,referer,if-none-match,if-none-mod等
  - 请求体
- 响应
  - 响应行
  - 响应头
  - 响应体：Content-Type，Content-Length,Encode-Type,Cache-Control,Set-Cookie,Location