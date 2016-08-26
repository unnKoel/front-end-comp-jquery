/**
 * Created by common on 2016/8/16.
 */
(function ($) {
  $.fn.page = function (opts) {
    var defaultOpts = {
      bottomFooter: true,
      footer: '.cmp-footer',
      header: '.cmp-header',
      main: '#main',
      needLogin: false,
      isLoginUrl: '/ck/user/isLogin'
    };

    var bootFooterAdjust = function () {
      //设置底页角
      if (opts.bottomFooter) {
        var docHeight = document.body.clientHeight,
          winHeight = document.documentElement.clientHeight,
          footerHeight = $(opts.footer).outerHeight(),
          headerHeight = $(opts.header).outerHeight();
        if (docHeight < winHeight) {  //文档高度小于窗口高度
          $(opts.main).height(winHeight - footerHeight - headerHeight);
        }
      }
    };

    return {
      //页面加载
      load: function (pageDo) {
        opts = $.extend(defaultOpts, opts);
        if (!opts.needLogin) {
          bootFooterAdjust();
          typeof pageDo === 'function' && pageDo();
        } else {
          return $.ajax({
            url: opts.isLoginUrl,
            method: 'POST'
          }).done(function (data) {
            if (data.code !== 0) {
              location.href = 'login.html?rel=' + encodeURIComponent(location.href);
              return;
            }
            bootFooterAdjust();
            typeof pageDo === 'function' && pageDo();
          })
        }
      }
    }
  };
})(jQuery);