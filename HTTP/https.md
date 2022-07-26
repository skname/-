## 加密
在 http 和 tcp 之间加了一层安全层 SSL/TLS

## 加密方式
- 对称加密：指加密和解密都使用的是相同的密钥。
- 非对称加密：非对称加密算法有 A、B 两把密钥，如果你用 A 密钥来加密，那么只能使用 B 密钥来解密；反过来，如果你要 B 密钥来加密，那么只能用 A 密钥来解密。
- 数字签名：


### **https 加密第一版 对称加密：**

- 在客户端与服务器建立TCP连接之后，开始验证加密方式，客户端发送浏览器所支持的加密方式，也就是加密套件列表，除此之外，浏览器还要携带一个随机数client-Random
- 服务器接收到之后，选择一种加密方式，然后还会生成一个随机数 service-random，并将 service-random 和加密套件列表返回给浏览器。
- 最后浏览器和服务器分别返回确认消息。这样浏览器端和服务器端都有相同的 client-random 和 service-random 了，然后它们再使用相同的方法将 client-random 和 service-random 混合起来生成一个密钥 master secret，有了密钥 master secret 和加密套件之后，双方就可以进行数据的加密传输了。

**缺点**：由于clien-random 和 server-random 和 加密套件列表是明文的，所以这种方式仍然不安全


### **https 第二版 非对称加密**
- 首先浏览器还是发送加密套件列表给服务器。
- 然后服务器会选择一个加密套件, 同时，浏览器维护了一个私钥，公钥，将公钥和选择的加密套件一起发送给客户端
- 最后就是浏览器和服务器返回确认消息
- 这样浏览器端就有了服务器的公钥，在浏览器端向服务器端发送数据时，就可以使用该公钥来加密数据。由于公钥加密的数据只有私钥才能解密，所以即便黑客截获了数据和公钥，他也是无法使用公钥来解密数据的。

**缺点**
- 无法保证服务器发送给浏览器的数据安全。虽然浏览器端可以使用公钥来加密，但是服务器端只能采用私钥来加密，私钥加密只有公钥能解密，但黑客也是可以获取得到公钥的，这样就不能保证服务器端数据的安全了。


### **https 第三版 非对称加密和对称加密搭配使用**
**思想**：在传输数据阶段依然使用对称加密，但是对称加密的密钥我们采用非对称加密来传输
- 首先浏览器向服务器发送对称加密套件列表、非对称加密套件列表和随机数 client-random；
- 服务器保存随机数 client-random，选择对称加密和非对称加密的套件，然后生成随机数 service-random，向浏览器发送选择的加密套件、service-random 和公钥；
- 浏览器保存公钥，并生成随机数 pre-master，然后利用公钥对 pre-master 加密，并向服务器发送加密后的数据；
- 最后服务器拿出自己的私钥，解密出 pre-master 数据，并返回确认消息。
- 到此为止，服务器和浏览器就有了共同的 client-random、service-random 和 pre-master，然后服务器和浏览器会使用这三组随机数生成对称密钥，因为服务器和浏览器使用同一套方法来生成密钥，所以最终生成的密钥也是相同的。

**缺点：**
- 虽然使用对称加密和非对称加密的方式，解决了数据在客户端和目标站点传输的安全问题，防止数据在中途被黑客窃取，但是，黑客仍然可以模拟服务器，也就是直接模拟目标网站，而浏览器却无法察觉。

### https 第四版 添加数字证书
解决问题：告诉浏览器，该网站就是我要访问的真实网站

**数字证书有两个作用：**
- 通过数字证书向浏览器证明服务器的身份
- 数字证书里面包含了服务器公钥

数字证书验证过程：
- 通过CA 机构 在签名时同样的 hash 函数来取得信息A，然后再利用证书中携带的公钥解密签名数据B，通过对比信息，可以确认该证书的可靠性和网站的可靠性