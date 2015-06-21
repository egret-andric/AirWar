/**
 *
 * @author
 *
 */
var AirPlane = (function (_super) {
    __extends(AirPlane, _super);
    /**
    * @param type:String 飞机类型
    * @param speed:String 飞机飞行速度
    * @param bulletType:String  子弹类型
    * @param bulletSpeed:String 子弹速度
    * @param bulletDelay:String 子弹发射频率
    *
    */
    function AirPlane(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints) {
        _super.call(this);
        this.bulletSpeed = 0;
        this.bulletDelay = 0;
        this.interval = 0; //飞机距离上次发射子弹间隔时间
        this.bulletNum = 0;
        this.maxBulletNum = 3;
        this.init(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints);
    }
    var __egretProto__ = AirPlane.prototype;
    __egretProto__.init = function (type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints) {
        this.type = type;
        this.speed = speed;
        this.bulletType = bulletType;
        this.bulletSpeed = bulletSpeed;
        this.bulletDelay = bulletDelay;
        this.launchPoints = launchPoints;
        this.createAirPlane();
        this.maxBulletNum = Math.ceil(Math.random() * 3);
    };
    __egretProto__.checkMax = function () {
        return this.bulletNum > this.maxBulletNum;
    };
    __egretProto__.launchBullets = function (interval) {
        if (this.bulletType == null || this.checkMax() || this.y < 0) {
            return;
        }
        this.interval += interval;
        if (this.interval > this.bulletDelay) {
            this.interval = 0;
            this.bulletNum++;
            var len = this.launchPoints.length;
            for (var i = 0; i < len; i++) {
                var p = this.launchPoints[i];
                var x = p["x"];
                var y = p["y"];
                this.launchBullet(x, y);
            }
        }
    };
    __egretProto__.launchBullet = function (x, y) {
        var bullet = Bullet.valueOf(this.bulletType, this.bulletSpeed);
        bullet.x = this.x + x;
        bullet.y = this.y + y;
        BulletManager.addBullet(bullet);
        LayerManager.getLayer(LayerManager.BULLET_LAYER).addChild(bullet);
        var endY = this.stage.stageHeight + bullet.height;
        bullet.launch(new egret.Point(bullet.x, bullet.y), new egret.Point(bullet.x, endY));
    };
    __egretProto__.destroy = function () {
        _super.prototype.destroy.call(this);
        if (AirPlane.pool.length < AirPlane.SIZE) {
            AirPlane.pool.push(this);
            this.bulletNum = 0;
        }
    };
    AirPlane.valueOf = function (type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints) {
        var result;
        if (AirPlane.pool.length > 0) {
            result = AirPlane.pool.pop();
            result.init(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints);
        }
        else {
            result = new AirPlane(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints);
        }
        return result;
    };
    __egretProto__.createAirPlane = function () {
        if (this.bmp == null) {
            this.bmp = new egret.Bitmap();
            this.addChild(this.bmp);
        }
        var texture = RES.getRes(this.type);
        this.bmp.texture = texture;
        this.anchorOffsetX = texture.textureWidth / 2;
        this.anchorOffsetY = texture.textureHeight / 2;
    };
    AirPlane.pool = [];
    AirPlane.SIZE = 20;
    return AirPlane;
})(MoveObject);
AirPlane.prototype.__class__ = "AirPlane";
