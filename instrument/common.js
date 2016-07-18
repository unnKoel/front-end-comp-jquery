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
            }
        }
    };

    win.cmm = function () {
        var cmm = {};
        cmm.clone(Browser());
        cmm.clone(Variate());
        return cmm;
    }
})(window);