/**
 * Created by common on 2016/8/9.
 */
(function (win) {
  /**
   * easyDialog支持ie6
   */
  var easyDialog = function (opts) {
    // 默认参数
    var defaults = {
        container: null,	        // string   弹处层内容的id
        isOverlay: true,	        // boolean  是否添加遮罩层
        fixed: true,          // boolean   是否静止定位
        follow: null,	       // string/object   是否跟随自定义元素来定位
        followX: 0,            // number    相对于自定义元素的X坐标的偏移
        followY: 0,            // number    相对于自定义元素的Y坐标的偏移
        autoClose: 0,            // number    自动关闭弹出层的时间
        callback: null          // function    关闭弹出层执行的回调函数
      },
      isIE = -[1,],
      isIE6 = -[1,] && !window.XMLHttpRequest;

    /**
     * 创建遮罩层
     * @returns {*|Element}
     */
    var createOverlay = function () {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;width:100%;height:100%;margin:0;padding:0;background:#333;opacity:0.6;filter:alpha(opacity=60);z-index:1000;border:none;left:0;top:0';
      if (isIE6) {
        overlay.style.position = 'absolute';
        overlay.style.setExpression('top', 'document.documentElement.scrollTop+"px"');
      }
      overlay.id = 'overlay';
      return overlay;
    };

    /**
     * 创建对话框
     * @param opts
     */
    var createDialog = function (opts) {
      var dialogLayer = document.createElement('div');
      dialogLayer.style.cssText = 'z-index:1001;margin:0;padding:0';
      if (opts.follow) {
        opts.fixed = false;
        opts.isOverlay = false;

        if (typeof opts.follow === 'string') {
          opts.follow = document.getElementById(opts.follow);
        }
      }

      if (opts.fixed) {
        dialogLayer.style.cssText = "position:fixed;top:50%;left:50%";
        if (isIE6) {
          dialogLayer.style.position = 'absolute';
          dialogLayer.style.setExpression('top', 'document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"');
        }
      } else {
        dialogLayer.style.position = 'absolute';
        if (!opts.follow) {
          dialogLayer.style.top = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + document.documentElement.clientHeight / 2 + 'px';
          dialogLayer.style.left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) + document.documentElement.clientWidth / 2 + 'px';
          win.onresize = function () {
            dialogLayer.style.top = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + document.documentElement.clientHeight / 2 + 'px';
            dialogLayer.style.left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) + document.documentElement.clientWidth / 2 + 'px';
          }
        } else {
          var offset = getOffset(opts.follow);
          dialogLayer.style.top = offset.top;
          dialogLayer.style.left = offset.left;
        }
      }
    };

    var setIe6FixedBody = function () {
      var body = document.body;
      if (body.currentStyle.backgroundAttachment !== 'fixed') {
        body.style.background = 'url(about:blank)';
        body.style.backgroundAttachment = 'fixed';
      }
    };

    // 防止IE6的select穿透
    var appendIframe = function (node) {
      node.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>';
    };

    // 获取元素在页面中的位置
    var getOffset = function (node) {
      var top = isIE ? node.getBoundingClientRect().top + doc.documentElement.scrollTop : node.offsetTop,
        left = isIE ? node.getBoundingClientRect().left + doc.documentElement.scrollLeft : node.offsetLeft;

      return {top: top, left: left};
    };

    return {
      open: function () {
        opts = cmm.paramJoin(defaults, opts);
        //创建弹窗
        var dialogLayer = createDialog();

        if (opts.isOverlay) {
          //创建遮罩层，并添加到body;
          var overlay = createOverlay();
          document.body.appendChild(overlay);
          if (isIE6) {
            appendIframe(overlay);
          }
        }
        //ie6下防止模拟fixed，浏览器抖动
        if (isIE6) setIe6FixedBody();

        if (isIE6 && !opts.isOverlay) {
          appendIframe(dialogLayer);
        }
        //把内容添加到弹窗，并添加到body;
        var contentLayer = document.getElementById(opts.container);
        dialogLayer.appendChild(contentLayer);
        contentLayer.style.display = 'block';
        var wh = contentLayer.offsetWidth,
          hh = contentLayer.offsetHeight;

        if (!opts.follow) {
          dialogLayer.style.marginTop = '-' + wh / 2 + 'px';
          dialogLayer.style.marginLeft = '-' + hh / 2 + 'px';
        }

        document.body.appendChild(dialogLayer);
      },


      close: function () {
        //隐藏内容
        //删除弹窗
        //删除遮罩层
      }
    };
  }
})(window);