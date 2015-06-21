/**
 *
 * @author
 *
 */
var LoopManager = (function () {
    function LoopManager() {
    }
    var __egretProto__ = LoopManager.prototype;
    LoopManager.init = function (stage) {
        if (LoopManager.inited) {
            return;
        }
        LoopManager.inited = true;
        LoopManager.funs = new MyArray();
        LoopManager.curTime = egret.getTimer();
        stage.addEventListener(egret.Event.ENTER_FRAME, LoopManager.onFrame, stage);
    };
    LoopManager.onFrame = function (e) {
        var len = LoopManager.funs.length;
        var time = egret.getTimer();
        var interval = time - LoopManager.curTime;
        LoopManager.curTime = time;
        for (var i = 0; i < len; i++) {
            var vo = LoopManager.funs.getEleByIndex(i);
            vo.execute(interval);
        }
    };
    LoopManager.addLoop = function (fun, obj) {
        var vo = HandleVO.valueOf(fun, obj);
        if (LoopManager.funs.search(vo) == null) {
            LoopManager.funs.push(vo);
        }
        else {
            vo.destroy();
        }
    };
    LoopManager.removeLoop = function (fun, obj) {
        var vo = HandleVO.valueOf(fun, obj);
        var equalVO = LoopManager.funs.search(vo);
        if (equalVO != null) {
            var index = LoopManager.funs.indexOf(equalVO);
            LoopManager.funs.splice(index, 1);
        }
    };
    return LoopManager;
})();
LoopManager.prototype.__class__ = "LoopManager";
