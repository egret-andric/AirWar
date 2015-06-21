/**
 *
 * @author andric
 *
 */
//module com.oytq.view {
var BgMap = (function (_super) {
    __extends(BgMap, _super);
    function BgMap(bg, stageH) {
        _super.call(this);
        this.speed = 0.08; //每毫秒移动像素速度
        this.bgTexture = bg;
        this.init(stageH);
    }
    var __egretProto__ = BgMap.prototype;
    __egretProto__.init = function (stageH) {
        var count = Math.ceil(stageH / this.bgTexture.textureHeight) + 1;
        this.bmpArr = [];
        for (var i = 0; i < count; i++) {
            var bmp = GameUtil.createBitmap(this.bgTexture);
            bmp.y = (i - 1) * bmp.height;
            this.addChild(bmp);
            this.bmpArr.push(bmp);
        }
    };
    __egretProto__.start = function () {
        LoopManager.addLoop(this.scroll, this);
    };
    __egretProto__.stop = function () {
        LoopManager.removeLoop(this.scroll, this);
    };
    __egretProto__.scroll = function (interval) {
        var v = interval * this.speed;
        var len = this.bmpArr.length;
        var removes;
        for (var i = 0; i < len; i++) {
            var map = this.bmpArr[i];
            map.y += v;
            if (map.y > this.stage.stageHeight) {
                if (removes == null) {
                    removes = [];
                }
                removes.push(map);
            }
        }
        if (removes != null) {
            var removeLen = removes.length;
            for (var j = 0; j < removeLen; j++) {
                var removeMap = removes[j];
                removeMap.y = this.bmpArr[0].y - this.bmpArr[0].height;
                var index = this.bmpArr.indexOf(removeMap);
                this.bmpArr.splice(index, 1);
                this.bmpArr.unshift(removeMap);
            }
        }
    };
    return BgMap;
})(egret.DisplayObjectContainer);
BgMap.prototype.__class__ = "BgMap";
//} 
