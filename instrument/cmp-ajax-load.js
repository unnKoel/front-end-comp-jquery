/**
 * Created by common on 2016/6/27.
 */
(function ($) {
  /**
   * ajax请求加载效果jquery组件
   *   插件会在选择的元素后添加一个加载图，当选择元素的内容在动态请求回来前，加载图动效显示；
   * @param that 被选择的元素,需要动态加载的内容元素
   * @param opts 加载图css样式
   * @returns {{init: Function, show: Function, hide: Function, isShow: Function}}
   * @constructor
   */
  var AjaxLoad = function (that, opts) {
    var _loadLayer;
    var _self;
    return {
      /**
       * 初始化加载图
       */
      init: function () {
        _self = that;
        _loadLayer = $('<div></div>');
        _loadLayer.css(opts).css('display', 'none');
        $(that).after(_loadLayer);
        return this;
      },

      /**
       * 显示加载图
       */
      show: function () {
        _self.css('display', 'none');
        _loadLayer.css('display', 'block');
      },

      /**
       * 隐藏加载层
       */
      hide: function () {
        _self.css('display', 'block');
        _loadLayer.css('display', 'none');
      },

      /**
       * 加载图是否显示
       * @returns {boolean}
       */
      isShow: function () {
        return _loadLayer.css('display') === 'block'
      }
    }
  };

  $.fn.ajaxLoad = function (options) {
    var it = this;

    return AjaxLoad(it, $.extend({
      height: '320px',
      background: 'url(\'statics/images/loading.gif\') no-repeat scroll center center'
    }, options)).init();
  }
})(jQuery);