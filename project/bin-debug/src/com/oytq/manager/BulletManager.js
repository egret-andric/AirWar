/**
 *
 * @author
 *
 */
var BulletManager = (function () {
    function BulletManager() {
    }
    var __egretProto__ = BulletManager.prototype;
    BulletManager.start = function (w, h) {
        LoopManager.addLoop(BulletManager.loop);
        BulletManager.stageW = w;
        BulletManager.stageH = h;
    };
    BulletManager.loop = function () {
        //检测敌法子弹
        var len = BulletManager.bullets.length;
        var myRect = AirPlaneManager.myPlane.getRect();
        for (var i = len - 1; i >= 0; i--) {
            var bullet = BulletManager.bullets[i];
            var rect = bullet.getRect();
            if (bullet.y >= BulletManager.stageH + bullet.height || myRect.intersects(rect)) {
                bullet.destroy();
                BulletManager.bullets.splice(i, 1);
            }
        }
        //检测自己子弹
        len = BulletManager.myBullets.length;
        for (var j = len - 1; j >= 0; j--) {
            var myBullet = BulletManager.myBullets[j];
            var myBulletRect = myBullet.getRect();
            if (myBulletRect.y < -myBulletRect.height) {
                myBullet.destroy();
                BulletManager.myBullets.splice(j, 1);
            }
            else {
                var enemyLen = AirPlaneManager.enemies.length;
                for (var k = enemyLen - 1; k >= 0; k--) {
                    var enemy = AirPlaneManager.enemies[k];
                    var myBulletRect = myBullet.getRect();
                    if (myBulletRect.intersects(enemy.getRect())) {
                        enemy.destroy();
                        AirPlaneManager.enemies.splice(k, 1);
                    }
                }
            }
        }
    };
    BulletManager.addBullet = function (bullet) {
        BulletManager.bullets.push(bullet);
    };
    BulletManager.addMyBullet = function (bullet) {
        BulletManager.myBullets.push(bullet);
    };
    BulletManager.bullets = [];
    BulletManager.myBullets = [];
    return BulletManager;
})();
BulletManager.prototype.__class__ = "BulletManager";
