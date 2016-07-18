/**
 * Created by common on 2016/7/6.
 */
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    }
});

Object.method('clone', function (leave) {
    var i;
    for (i in leave) {
        if (typeof leave[i] === 'function' && leave.hasOwnProperty(i)) {
            //this.method(i, leave[i]);
            this[i] = leave[i];
        }
    }
    return this;
});