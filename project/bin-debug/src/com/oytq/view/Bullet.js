/**
 *
 * @author
 *
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(type, speed) {
        _super.call(this);
        this.init(type, speed);
    }
    var __egretProto__ = Bullet.prototype;
    __egretProto__.destroy = function () {
        _super.prototype.destroy.call(this);
        if (Bullet.pool.length < Bullet.SIZE) {
            Bullet.pool.push(this);
        }
    };
    Bullet.valueOf = function (type, speed) {
        var result;
        if (Bullet.pool.length > 0) {
            result = Bullet.pool.pop();
            result.init(type, speed);
        }
        else {
            result = new Bullet(type, speed);
        }
        return result;
    };
    __egretProto__.init = function (type, speed) {
        this.type = type;
        this.speed = speed;
        this.createBullet();
    };
    __egretProto__.createBullet = function () {
        if (this.bmp == null) {
            this.bmp = new egret.Bitmap();
            this.addChild(this.bmp);
        }
        var texture = RES.getRes(this.type);
        this.bmp.texture = texture;
        this.anchorOffsetX = texture.textureWidth / 2;
        this.anchorOffsetY = texture.textureHeight / 2;
    };
    Bullet.pool = [];
    Bullet.SIZE = 100;
    return Bullet;
})(MoveObject);
Bullet.prototype.__class__ = "Bullet";
