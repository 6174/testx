### 2.27
* 读取config -> webdriver运行 -> webdriver运行脚本 

### 2.28 
* 完成UI设计

### 3.1
* driver的完善， 支持task任务
* jasmine测试的包装
* 一个http-server , socket.io服务， 已经静态文件服务器
* 测试报告的返回

### todo-demo 总结
* 无法获取加载inject之前的测试报告
* 把测试过程中的错误抛出来, 方便用户排查错误
* raise出来的错误指向combo.js 但是却无法展现combo.js的代码
* 给用户提供是否自动关闭浏览器的配置项, 方便用户排查错误
* 把用户测试脚本文件和测试lib文件分开， 
* 当用户脚本文件出错过后会导致无法执行任何脚本  

### 3.12 
* 无法开启多个实例， 因为服务端口被占用， -- 只实例化一个应用
* 错误信息的modal弹出框
* project 添加过后自动选择该项目， project 删除过后如果是当前项目， 显示about信息 
* [bug]添加没有config.json的project时， 在project列表间来回选择会出现异常错误

