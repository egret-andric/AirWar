/**
 *
 * @author
 *
 */
var MyAirPlane = (function (_super) {
    __extends(MyAirPlane, _super);
    function MyAirPlane(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints) {
        _super.call(this, type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints);
    }
    var __egretProto__ = MyAirPlane.prototype;
    __egretProto__.launchBullet = function (x, y) {
        var bullet = Bullet.valueOf(this.bulletType, this.bulletSpeed);
        bullet.x = this.x + x;
        bullet.y = this.y + y;
        BulletManager.addMyBullet(bullet);
        LayerManager.getLayer(LayerManager.BULLET_LAYER).addChild(bullet);
        var endY = -bullet.height;
        bullet.launch(new egret.Point(bullet.x, bullet.y), new egret.Point(bullet.x, endY));
    };
    __egretProto__.checkMax = function () {
        return false;
    };
    return MyAirPlane;
})(AirPlane);
MyAirPlane.prototype.__class__ = "MyAirPlane";
