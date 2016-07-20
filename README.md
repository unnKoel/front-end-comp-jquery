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

    ie() && window.atob

  - ie 11

    ie() && !window.all

### 判断浏览器类型
  - 从navigator.userAgent用户代理字符串中截取类型；

----------------------------------------------------

### js dom style
#### style.cssText -字符串设置元素的多个样式；
  
  ```
  document.getElementById('myP').style.cssText="background-color:pink;font-size:55px;border:2px dashed green;color:white;";
  ```
  
#### .style.setExpression  -通过javascript表达式来设置css;
  ```
   div.style.setExpression ("width","myInput.value + 'px'");
  ```
  
  http://help.dottoro.com/ljarcrag.php
  
  只有ie支持；从ie9就不再支持，支持到ie8;
  
#### document.documentElement  -返回文档根元素，即\<html\>
  
  https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
  
  这个property是只读的；
  
#### scrollTop - 获取或设置一个元素被向上滚动的px
  
  http://help.dottoro.com/ljnvjiow.php
  
#### 关于滚动事件 onScroll
  - onScroll
  - scrollLeft, scrollTop
  - scrollWidth, scrollHeight

#### 元素的高宽
  
##### 获取一个已渲染的元素的宽度
  - clientWidth property
    
  - scrollWidth property
    
  - offsetWidth property
    
  - getBoundingClientRect method
    
  
##### 元素的宽度属性
  - width       返回一个带宽度的字符串
  - posWidth    返回一个已当前单位表示的浮点数
  - pixelWidth  返回一个以px作为单位的宽度integer
  
  
#### 元素的位置
  - offsetLeft 
  - offsetTop
  - clientLeft
  - clientTop
  - scrollLeft
  - scrollTop
  - screenLeft
  - screenX
  - getBoundingClientRect method