# front-end-comp-jquery
基于jquery的网站常用组件实现，和第三发组件收集整理；

#easydialog
  简单对话框插件；

## 判断IE的方法
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

## 判断IE各个版本
### documentMode版本
  - ie 6

    ie() && !window.XMLHttpRequest;
    ie7开始才支持XMLHttpRequest;

  - ie7

    ie() && window.XMLHttpRequest && !document.documentMode
    ie7 支持XMLHttpRequest,但ie8才开始支持documentMode

  - ie8,9

    ie() && document.documentMode==8;

    ie() && document.documentMode==9;

### ie特性版本
  - ie 8

    ie() && document.documentMode
  - ie 9

    ie() && window.addEventListener && !window.atob;

  - ie 10

    ie() && window.atob

  - ie 11

    ie() && !window.all

## 判断浏览器类型
  - 从navigator.userAgent用户代理字符串中截取类型；

----------------------------------------------------

## js style
### style.cssText -字符串设置元素的多个样式；
  
  ```
  document.getElementById('myP').style.cssText="background-color:pink;font-size:55px;border:2px dashed green;color:white;";
  ```
  
### .style.setExpression  -通过javascript表达式来设置css;
  ```
   div.style.setExpression ("width","myInput.value + 'px'");
  ```
  
  http://help.dottoro.com/ljarcrag.php
  
  只有ie支持；从ie9就不再支持，支持到ie8;
  
### style,currentStyle,cssStyleDeclaration

  -style 获取通过style属性设置的css
  -currentStyle和cssStyleDeclaration 获取计算后的css，前者ie支持，后者非ie支持

### 元素的位置
  - offsetLeft/offsetTop/offsetWidth/offsetHeight

    offsetLeft/offsetTop
    
    
    ```
    是元素相对offsetParent元素的位置，offsetParent是指设置了position:relative,
    absolute,fixed的父元素；
    元素的外边框相对offsetParent的内边框的距离，所以除了border，其他margin,padding都包括
    对应的jquery方法是offset(),获取元素相对于document的位置
    ```
    
    offsetWidth/offsetHeight
    
    
    ```
    offsetWidht/offsetHeight包括border,padding,scrollBar,但不包括margin
    ```

  - clientLeft/clientTop/clientWidth/clientHeight

    clientLeft/clientTop
    
    
    ```
    获取元素的borderLeftWidth,和borderTopWidth
    ```
    clientWidth/clientHeight
    
    
    ```
    获取元素的宽和高，只包括元素的padding
    ```

  - scrollLeft/scrollTop/scrollWidth/scrollHeight

    scrollLeft/scrollTop
    
    
    ```
    ...
    ```

    scrollWidth/scrollHeight
    
    
    ```
    内容的高度和宽度，包括padding，不包括margin,scroller,border
    ```

  - screenLeft/screenTop/screenX/screenY/outerWidth/outerHeight
    screenLeft/screenTop/screenX/screenY
    
    ```
    screenLeft/screenTop/screenX/screenY在 chrome和safari中是一样的，都是获取窗口距离屏幕的位置；
    在ie中screenLeft/screenTop是可视区域距离屏幕的位置， ie9以上后支持screenX/screenY，获取窗口距离屏幕的位置；
    火狐不支持screenLeft/screenTop，支持screenX/screenY
    ```
    
    outerWidth/outerHeight
    
    ```
    获取窗口的高度和宽度，ie9才支持
    ```
    
  - left,posLeft,pixelLeft
  
### 获取一个已渲染的元素的宽度
  - clientWidth property 元素可视区域的宽度，只包括padding
    document.documentElement.clientHeight 窗口的高度

  - scrollWidth property 元素内容的宽度，包括padding,不包括滚动条,margin,border；

  - offsetWidth property 元素可视区域的宽度，包括padding,滚动条，border,不包括margin;

  - getBoundingClientRect method

### 元素的宽度属性
  - width       返回一个带宽度的字符串
  - posWidth    返回一个已当前单位表示的浮点数
  - pixelWidth  返回一个以px作为单位的宽度integer

##js dom
  
### document.documentElement  -返回文档根元素，即\<html\>
    
    https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
    
    这个property是只读的；
  
### 关于滚动事件 onscroll
  - onscroll 
  - scrollLeft, scrollTop
  - scrollWidth, scrollHeight

  制造滚动条有两种方式:(1) 外层元素设置一个小于内层元素的高度，并且overflow:auto;
                   (2) 外出元素设置postion:absolute,height:auto,overflow:auto;
                   
  顶层窗口的滚动：ie 在document.documentElement(HTML)有效；
               其他浏览器，在document.body有效；
              
### 获取属性
  - getAttribute,setAttribute,removeAttribute 被所有浏览器支持
  - getPropertyValue,setProperty,removeProperty ie9及以上
  
### 元素的高宽

#### DocumentFragment
DocumentFragment是一个很类似document,但与文档上下文无关的对象；它也拥有document的方法，比如appendChild,insertBefore等；
你创建的DocumentFragment对象可以被插入到文档对象树中(通过appendChild或insertBefore)；

- DocumentFragment的创建

  通过document.createDocumentFragment方法来创建documentfragment对象
  ```
  var newDocFrag = document.createDocumentFragment ();
  ```
  通过Range.createContextualFragment方法创建
> 参考 http://help.dottoro.com/ljedicfj.php
  
  
### ie6 bugs

##### select穿透

ie6下 div 遮住iframe,iframe遮住select,select 遮住div;

\<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"\>\</iframe\>

##### 模拟fixed

(1)元素使用absolute定位，并随着页面滚动而滚动;

(2)防止页面抖动；body设置背景about:blank, 背景attach设置fixed;