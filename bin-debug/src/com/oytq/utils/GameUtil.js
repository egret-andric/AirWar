/**
*
* @author oytq
*
*/
var GameUtil = (function () {
    function GameUtil() {
    }
    var __egretProto__ = GameUtil.prototype;
    GameUtil.createBitmap = function (texture) {
        var bmp = new egret.Bitmap();
        bmp.texture = texture;
        return bmp;
    };
    return GameUtil;
})();
GameUtil.prototype.__class__ = "GameUtil";
