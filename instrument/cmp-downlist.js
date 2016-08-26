/**
 * Created by common on 2016/8/24.
 */
(function ($) {
  /**
   *
   * @param that
   * @param opts
   *      placeholder 文本框提示
   *      inputStyle 文本框样式
   *      toggleBackground 按钮背景
   *      options  所有选项
   *
   * @returns {{drew: Function}}
   */
  var cmpDownList = function (that, opts) {
    var _self = $(that),
      _$triggle,
      _$menu,
      _$input;
    var _domDrew = function () {
      var $downList = $('<div class="down-list"></div>').css('position', 'relative');
      _$input = $('<input type="text" readonly>').attr('placeholder', opts.placeholder);
      _$input.css(opts.inputStyle);
      $downList.append(_$input);
      _self.append($downList);

      var inputInnerH = _$input.innerHeight(),
        inputW = _$input.width(),
        inputBorderW = _$input[0].clientLeft,
        inputOuterH = _$input.outerHeight(),
        inputBg = _$input.css('background-color'),
        inputBorder = _$input.css('border'),
        inputTxtIndent = _$input.css('text-indent');


      _$triggle = $('<a class="triggle"></a>').css({
        position: 'absolute', cursor: 'pointer',
        top: inputBorderW + 'px', right: inputBorderW + 'px', background: opts.toggleBackground,
        width: inputInnerH, height: inputInnerH
      });

      _$menu = $('<ul class="menu"></ul>').css({
        position: 'absolute',
        left: 0,
        top: inputOuterH + 'px',
        border: inputBorder,
        borderTop: 'none',
        backgroundColor: inputBg,
        display: 'none'
      });

      var lis = opts.options;
      $.each(lis, function (index, obj) {
        _$menu.append($('<li></li>').data('value', obj.value).text(obj.text).css({
          width: inputW,
          textIndent: inputTxtIndent,
          'padding-bottom': '5px',
          cursor: 'pointer'
        }).on('mouseover', function () {
          $(this).css({
            'background-color': '#21b8f5',
            'color': '#fff'
          })
        }).on('mouseout', function () {
          $(this).css({
            'background-color': '#fff',
            'color': '#333'
          })
        }));
      });
      $downList.append(_$triggle, _$menu);
    };

    var _menuDown = function () {
      _$triggle.toggleClass('down');
      _$menu.css('display', 'block');
    };

    var _menuUp = function () {
      _$triggle.toggleClass('down');
      _$menu.css('display', 'none');
    };

    var _isMenuDown = function () {
      return _$triggle.hasClass('down');
    };

    var _menuSelect = function () {
      //选择某个选项
      _$menu.find('li').on('click', function () {
        _menuUp();
        var value = $(this).data('value');
        _$input.attr('data-value', value);
        _$input.val($(this).text());
      });

      //点击下拉按钮
      _$triggle.on('click', function () {
        if (!_isMenuDown()) {
          _menuDown();
        } else {
          _menuUp();
        }
      });

      $(document).click(function (event) {
        event = event || window.event;
        var it = $(event.target);
        if (!it.parentsUntil(document.body, '.down-list').length) {
          if (_isMenuDown()) {
            _menuUp();
          }
        }
      })
    };

    return {
      drew: function () {
        _domDrew();
        _menuSelect();
      }
    }
  };

  $.fn.cmpDownList = function (options) {
    options.inputStyle = $.extend({
      'height': '26px',
      'line-height': '26px',
      'border': '1px solid #ccc',
      'text-indent': '5px',
      'background-color': '#fff'
    }, options.inputStyle);
    cmpDownList(this, options).drew();
  }
})(jQuery);