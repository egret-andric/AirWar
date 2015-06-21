/**
 *
 * @author
 *
 */
var MoveObject = (function (_super) {
    __extends(MoveObject, _super);
    function MoveObject() {
        _super.call(this);
        this.speed = 0;
    }
    var __egretProto__ = MoveObject.prototype;
    __egretProto__.launch = function (start, end) {
        this.x = start.x;
        this.y = start.y;
        var distance = egret.Point.distance(start, end);
        var t = distance * 1000 / this.speed;
        this.tween = egret.Tween.get(this);
        this.tween.to({ x: end.x, y: end.y }, t);
    };
    __egretProto__.getRect = function () {
        var rect = new egret.Rectangle();
        rect.x = this.x - this.anchorOffsetX;
        rect.y = this.y - this.anchorOffsetY;
        rect.width = this.width;
        rect.height = this.height;
        return rect;
    };
    __egretProto__.destroy = function () {
        if (this.tween != null) {
            this.tween.setPaused(true);
            this.tween = null;
        }
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return MoveObject;
})(egret.Sprite);
MoveObject.prototype.__class__ = "MoveObject";
