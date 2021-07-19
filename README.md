# frida_tools_for_Android

### 1. readhttp.js-http

抓取应用http通信数据包

1. 端口转发：
   `adb forward tcp:27043 tcp:27043`

2. 执行脚本：
   `frida -U -f packageName -l readhttp.js --no-pause`
3. 获取应用包名

 - 在手机上打开应用
 - 获取当前页面的Activity：`adb shell dumpsys activity top | grep ACTIVITY`

### 2. check_app_realTime_request_Permission.js

实时获取应用向系统请求的权限