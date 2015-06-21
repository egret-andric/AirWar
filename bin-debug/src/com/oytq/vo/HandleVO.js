/**
 *
 * @author
 *
 */
var HandleVO = (function () {
    function HandleVO(fun, obj) {
        this.fun = fun;
        this.obj = obj;
    }
    var __egretProto__ = HandleVO.prototype;
    __egretProto__.equals = function (vo) {
        if (this.obj != vo.obj) {
            return false;
        }
        if (this.fun != vo.fun) {
            return false;
        }
        return true;
    };
    __egretProto__.execute = function (interval) {
        this.fun.apply(this.obj, [interval]);
    };
    HandleVO.valueOf = function (fun, obj) {
        var result = null;
        if (HandleVO.pool.length > 0) {
            result = HandleVO.pool.pop();
            result.fun = fun;
            result.obj = obj;
        }
        else {
            result = new HandleVO(fun, obj);
        }
        return result;
    };
    __egretProto__.destroy = function () {
        if (HandleVO.pool.length < HandleVO.SIZE) {
            if (HandleVO.pool.indexOf(this) == -1) {
                this.fun = null;
                this.obj = null;
                HandleVO.pool.push(this);
            }
        }
    };
    HandleVO.pool = [];
    HandleVO.SIZE = 10;
    return HandleVO;
})();
HandleVO.prototype.__class__ = "HandleVO";
