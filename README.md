# front-end-comp-jquery
基于jquery的网站常用组件实现，和第三发组件收集整理；

## easydialog
  简单对话框插件；

### 判断IE的方法
  - -[1,]

    -[1,],首先[1,]会转成字符串，在ie下是'1,',其他浏览器是'1';-号把字符串转成number类型，
    ie下为NaN,其他浏览器是数字1；
  - +"\v1"

    \v是垂直制表符，ie不支持，转成数字的话，为NaN;而其他浏览器为数字1；
  - window.attachEvent && navigator.userAgent.indexOf('Opera')===-1

    ie下添加事件attachEvent();其他浏览器addEventListener();另外Opera可以伪装成ie;
    
  - document.all && navigator.userAgent.indexOf(''Opera)===-1
  
  - !!window.ActiveXObject

    兼容IE11: "ActiveXObject" in window

### 判断IE各个版本
  #### documentMode版本
  - ie 6

    ie() && !window.XMLHttpRequest;
    ie7开始才支持XMLHttpRequest;

  - ie7

    ie() && window.XMLHttpRequest && !document.documentMode
    ie7 支持XMLHttpRequest,但ie8才开始支持documentMode

  - ie8,9

    ie() && document.documentMode==8;

    ie() && document.documentMode==9;

  #### ie特性版本
  - ie 8

    ie() && document.documentMode
  - ie 9

    ie() && window.addEventListener && !window.atob;

  - ie 10

    ie() && window.atob && 