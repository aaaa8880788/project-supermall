# 项目名称
    仿蘑菇街商场的移动端项目

# 项目描述
     该项目主要用的Vue2.0开发，网络请求部分由axios封装函数导入，交互数据主要用的Vuex中state来存储，在mutations中用sessionStorage将state的数据存入浏览器的会话缓存中，以防止刷新丢失数据，各个页面的切换采用Vue-router技术

# 项目在线预览
[在线预览](http://47.97.37.90/supermall)



#启动方法
    这里启动项目的方法有两种，因为里面的数据采用的是接口获取数据，而文件里面有一个是自用接口，一个是codewhy的接口，他的接口是随时可能过期，如果没过期用那个当然最好，如果过期了就用无脑启动方法，没过期直接启动项目即可，自用接口里面的数据可能不全，可能会造成页面的部分数据丢失



# 无脑启动方法
 ①server 中 
  1.npm i
  2.npm run serve
 ②supermall-first中
  request中修改url，注释中有，3000那个
  1.npm i
  2.npm run serve


#项目演示
  演示地址：https://www.bilibili.com/video/BV1sL4y1v7y3/?share_source=copy_web  
  up主：三岁玩泥巴

# 各个页面的基本展示

# 首页
![首页](https://images.gitee.com/uploads/images/2021/1114/161400_b14a00cc_8883882.png "首页.png")
# 分类
![分类页面](https://images.gitee.com/uploads/images/2021/1114/154108_a7405d3f_8883882.png "分类.png")
# 购物车
![购物车](https://images.gitee.com/uploads/images/2021/1114/154731_e038fa07_8883882.png "购物车.png")
# 我的
![我的](https://images.gitee.com/uploads/images/2021/1114/154745_9fe5ccc7_8883882.png "我的.png")
# 详情
![详情](https://images.gitee.com/uploads/images/2021/1114/154756_412d13a9_8883882.png "详情.png")
# 已购
![已购](https://images.gitee.com/uploads/images/2021/1114/154811_942dbaa5_8883882.png "已购.png")


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


