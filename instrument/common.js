/**
 * Created by common on 2016/7/6.
 */

(function (win) {
  /**
   * 浏览器相关
   * @returns {{isIE: Function, getIEVersion: Function, getType: Function}}
   * @constructor
   */
  var Browser = function () {
    return {
      /**
       * IE浏览器判断
       * @returns {boolean}
       *    true:  ie browser
       *    false: 非ie browser
       */
      isIE: function () {
        return !-[1,];
      },


      /**
       * 获取IE浏览器版本
       * @returns {*}
       *  版本数字，比如ie6,返回6
       */
      getIEVersion: function () {
        var ieVersion;
        if (this.isIE()) {
          if (!window.XMLHttpRequest) {
            ieVersion = 6;
          }
          if (window.XMLHttpRequest && !document.documentMode) {
            ieVersion = 7
          }
          if (document.documentMode && !document.addEventListener) {
            ieVersion = 8;
          }
          if (document.addEventListener && !window.atob) {
            ieVersion = 9;
          }
          if (document.addEventListener && window.atob) {
            ieVersion = 10;
          }
          if (!document.all) {
            ieVersion = 11;
          }
        }

        return ieVersion;
      },

      /**
       * 获取浏览器类型
       * @returns {string|*}
       *  浏览器类型字符串，比如ie7，返回'ie7';
       *  非ie浏览器，只返回浏览器类型，不返回版本号。
       *    'firefox','chrome','opera','safari';
       */
      getBrowserType: function () {
        var type,
          ieVersion = this.getIEVersion();
        type = 'ie' + ieVersion;
        if (!ieVersion) {
          var Sys = {};
          var ua = navigator.userAgent.toLowerCase();
          var s;
          (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
              (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

          if (Sys.firefox) type = 'firefox';
          if (Sys.chrome) type = 'chrome';
          if (Sys.opera) type = 'opera';
          if (Sys.safari) type = 'safari';
        }
        return type;
      }
    }
  };

  /**
   * 变量相关
   * @returns {{isNumber: Function, isNull: Function}}
   * @constructor
   */
  var Variate = function () {
    return {

      /**
       * 变量是否为数字类型(判断了NaN)
       * @param value
       * @returns {boolean}
       */
      isNumber: function (value) {
        return typeof value === 'number' && isFinite(value);
      },

      isNull: function (value) {
        return !value && typeof value === 'object';
      },

      /**
       * 参数合并
       * @param paramDefault
       * @param paramTarget
       */
      paramJoin: function (paramDefault, paramTarget) {
        var temp = {}, i;
        for (i in paramDefault) {
          if (paramDefault.hasOwnProperty(i)) {
            temp[i] = paramTarget && paramTarget[i] !== undefined ? paramTarget[i] : paramDefault[i];
          }
        }
        return temp;
      }
    }
  };

  /**
   * Dom 操作相关
   * @returns {{addLoadEvent: Function, insertAfter: Function}}
   * @constructor
   */
  var Dom = function () {
    return {
      /**
       * 网页加载完执行事件
       * @param func
       */
      addLoadEvent: function (func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        } else {
          window.onload = function () {
            oldonload();
            func();
          }
        }
      },

      /**
       * 在目标元素后插入新的元素
       * @param newElement 待插入新元素
       * @param targetElement 目标元素
       */
      insertAfter: function (newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
          parent.appendChild(newElement);
        } else {
          parent.insertBefore(newElement, targetElement.nextSibling);
        }
      },

      /**
       * 删除一个节点
       * @param node
       */
      removeNode: function (node) {
        if (cmm.isIE()) {
          var div = document.createElement('div');
          div.appendChild(node);
          div.innerHTML = '';
        } else {
          node.parentNode.removeChild(node);
        }
      }
    }
  };

  /**
   * 网络相关
   * @returns {{getHttpObject: Function}}
   * @constructor
   */
  var Network = function () {
    return {
      /**
       * 获取ajax对象，兼容IE7以下浏览器
       * @returns {XMLHttpRequest|global.XMLHttpRequest}
       */
      getHttpObject: function () {
        if (typeof XMLHttpRequest === 'undefined')
          XMLHttpRequest = function () {
            try {
              return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e) {
            }
            try {
              return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e) {
            }
            try {
              return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            }
            return false;
          };
        return new XMLHttpRequest();
      }
    }
  };

  var ie6Compatibility = function () {
    return {
      /**
       * 模拟fixed定位
       */
      ie6SimulateFixed: function (node, top) {
        if (cmm.getIEVersion() !== 6)return;
        node.style.position = 'absolute';
        node.style.setExpression('top', 'document.documentElement.scrollTop+top+"px"');
        var body = document.body;
        if (body.currentStyle.backgroundAttachment !== 'fixed') {
          body.style.background = 'url(about:blank)';
          body.style.backgroundAttachment = 'fixed';
        }
      },

      setIe6FixedBody: function () {
        if (cmm.getIEVersion() !== 6)return;
        var body = document.body;
        if (body.currentStyle.backgroundAttachment !== 'fixed') {
          body.style.background = 'url(about:blank)';
          body.style.backgroundAttachment = 'fixed';
        }
      },

      // 防止IE6的select穿透
      selectPierce: function (node) {
        if (cmm.getIEVersion() !== 6)return;
        node.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>';
      }
    }
  };

  win.cmm = (function () {
    var util = {};
    util.clone(Browser());
    util.clone(Variate());
    util.clone(Dom());
    util.clone(Network());
    return util;
  })();
})
(window);