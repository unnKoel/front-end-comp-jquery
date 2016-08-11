/**
 * Created by common on 2016/8/9.
 */
(function (win) {
  /**
   * easyDialog支持ie6
   */
  var easyDialog = function () {
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
      isIE = !-[1,],
      isIE6 = !-[1,] && !window.XMLHttpRequest,
      timer,
      doc = win.document,
      body = doc.body,
      contentLayer,
      opts = {};

    /**
     * 创建遮罩层
     * @returns {*|Element}
     */
    var createOverlay = function () {
      var overlay = doc.createElement('div');
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
     */
    var createDialog = function () {
      var dialogLayer = doc.createElement('div');
      dialogLayer.style.cssText = 'z-index:1001;margin:0;padding:0';
      if (opts.follow) {
        opts.fixed = false;
        opts.isOverlay = false;

        if (typeof opts.follow === 'string') {
          opts.follow = doc.getElementById(opts.follow);
        }
      }

      if (opts.fixed) {
        dialogLayer.style.position = 'fixed';
        dialogLayer.style.top = '50%';
        dialogLayer.style.left = '50%';
        if (isIE6) {
          dialogLayer.style.position = 'absolute';
          dialogLayer.style.setExpression('top', 'document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"');
        }
      } else {
        dialogLayer.style.position = 'absolute';
        if (!opts.follow) {
          dialogLayer.style.top = Math.max(doc.documentElement.scrollTop, body.scrollTop) + doc.documentElement.clientHeight / 2 + 'px';
          dialogLayer.style.left = Math.max(doc.documentElement.scrollLeft, body.scrollLeft) + doc.documentElement.clientWidth / 2 + 'px';
          win.onresize = function () {
            dialogLayer.style.top = Math.max(doc.documentElement.scrollTop, body.scrollTop) + doc.documentElement.clientHeight / 2 + 'px';
            dialogLayer.style.left = Math.max(doc.documentElement.scrollLeft, body.scrollLeft) + doc.documentElement.clientWidth / 2 + 'px';
          }
        } else {
          var offset = getOffset(opts.follow);
          dialogLayer.style.top = offset.top + opts.followY + 'px';
          dialogLayer.style.left = offset.left + opts.followX + 'px';
        }
      }
      dialogLayer.id = 'dialog_box';
      return dialogLayer;
    };

    // 获取元素在页面中的位置
    var getOffset = function (node) {
      var top = isIE ? node.getBoundingClientRect().top + doc.documentElement.scrollTop : node.offsetTop,
        left = isIE ? node.getBoundingClientRect().left + doc.documentElement.scrollLeft : node.offsetLeft;

      console.log({top: top, left: left});
      return {top: top, left: left};
    };

    return {
      open: function (options) {
        var self = this;
        if (doc.getElementById('dialog_box')) self.clone();  //如果已有弹窗，则关闭

        opts = cmm.paramJoin(defaults, options);
        //创建弹窗
        var dialogLayer = createDialog();

        if (opts.isOverlay) {
          //创建遮罩层，并添加到body;
          var overlay = createOverlay();
          body.appendChild(overlay);
          if (isIE6) {
            cmm.selectPierce(overlay);
          }
        }
        //ie6下防止模拟fixed，浏览器抖动
        if (isIE6) cmm.setIe6FixedBody();

        if (isIE6 && !opts.isOverlay) {
          cmm.selectPierce(dialogLayer);
        }
        //把内容添加到弹窗，并添加到body;
        contentLayer = doc.getElementById(opts.container);
        dialogLayer.appendChild(contentLayer);
        body.appendChild(dialogLayer);
        contentLayer.style.display = 'block';
        var wh = contentLayer.offsetWidth,
          hh = contentLayer.offsetHeight;

        if (!opts.follow) {
          dialogLayer.style.marginLeft = '-' + wh / 2 + 'px';
          dialogLayer.style.marginTop = '-' + hh / 2 + 'px';
        }

        //定时关闭
        if (opts.autoClose && typeof opts.autoClose === 'number') {
          timer = setTimeout(function () {
            self.close();
            clearTimeout(timer);
          }, opts.autoClose);
        }

        doc.onkeyup = function (e) {
          e = e || window.event;
          if (e.keyCode === 27) self.close();
        };
      },


      close: function () {
        //删除弹窗
        if (doc.getElementById('overlay')) {
          cmm.removeNode(doc.getElementById('overlay'));
        }
        //隐藏内容,删除遮罩层
        contentLayer.style.display = 'none';
        body.appendChild(contentLayer);
        cmm.removeNode(doc.getElementById('dialog_box'));

        if (opts.callback && typeof opts.callback === 'function') {
          opts.callback();
        }
      }
    };
  };
  win.components = {};
  components.easyDialog = easyDialog;
})(window);