/**
 *
 * @author
 *
 */
var MyArray = (function () {
    function MyArray() {
        this.arr = [];
    }
    var __egretProto__ = MyArray.prototype;
    __egretProto__.push = function (obj) {
        this.arr.push(obj);
    };
    __egretProto__.pop = function () {
        this.arr.pop();
    };
    __egretProto__.splice = function (start, deleteCount) {
        this.arr.splice(start, deleteCount);
    };
    __egretProto__.indexOf = function (obj) {
        return this.arr.indexOf(obj);
    };
    __egretProto__.getEleByIndex = function (index) {
        return this.arr[index];
    };
    __egretProto__.search = function (vo) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var ele = this.getEleByIndex(i);
            if (ele.equals(vo)) {
                return ele;
            }
        }
        return null;
    };
    Object.defineProperty(__egretProto__, "length", {
        get: function () {
            return this.arr.length;
        },
        enumerable: true,
        configurable: true
    });
    return MyArray;
})();
MyArray.prototype.__class__ = "MyArray";
