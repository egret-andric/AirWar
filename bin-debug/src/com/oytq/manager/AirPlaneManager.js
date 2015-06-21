/**
 *
 * @author
 *
 */
var AirPlaneManager = (function () {
    function AirPlaneManager() {
    }
    var __egretProto__ = AirPlaneManager.prototype;
    AirPlaneManager.start = function (w, h) {
        LoopManager.addLoop(AirPlaneManager.loop);
        AirPlaneManager.createMyPlane(w, h);
        AirPlaneManager.stageW = w;
        AirPlaneManager.stageH = h;
    };
    AirPlaneManager.createMyPlane = function (w, h) {
        var obj = AirPlaneManager.myPlaneObj;
        var plane = new MyAirPlane(obj["type"], 0, obj["bullet"], 400, obj["delay"], obj["p"]);
        plane.x = w / 2;
        plane.y = h - plane.height / 2;
        AirPlaneManager.myPlane = plane;
        LayerManager.getLayer(LayerManager.MY_PLANE_LAYER).addChild(plane);
        plane.addEventListener(egret.TouchEvent.TOUCH_MOVE, AirPlaneManager.onMove, plane);
        plane.touchEnabled = true;
    };
    AirPlaneManager.onMove = function (e) {
        AirPlaneManager.myPlane.x = e.stageX;
        AirPlaneManager.myPlane.y = e.stageY;
    };
    AirPlaneManager.addEnemy = function () {
        if (Math.random() > 0.5) {
            var len = AirPlaneManager.planes.length;
            var index = Math.floor(Math.random() * len);
            var obj = AirPlaneManager.planes[index];
            var enemy = AirPlane.valueOf(obj["type"], 150, obj["bullet"], 300, obj["delay"], obj["p"]);
            AirPlaneManager.enemies.push(enemy);
            var start = AirPlaneManager.getStart(enemy);
            var end = new egret.Point(start.x, AirPlaneManager.stageH + enemy.height);
            enemy.launch(start, end);
            LayerManager.getLayer(LayerManager.AIRPLANE_LAYER).addChild(enemy);
        }
    };
    AirPlaneManager.getStart = function (enemy) {
        var start = new egret.Point();
        var x = Math.random() * AirPlaneManager.stageW;
        x = Math.max(enemy.width / 2, x);
        x = Math.min(AirPlaneManager.stageW - enemy.width / 2, x);
        start.x = x;
        start.y = -enemy.height;
        return start;
    };
    AirPlaneManager.loop = function (interval) {
        AirPlaneManager.frameCount++;
        if (AirPlaneManager.frameCount % 50 == 0) {
            AirPlaneManager.addEnemy();
        }
        var myRect = AirPlaneManager.myPlane.getRect();
        var len = AirPlaneManager.enemies.length;
        for (var i = len - 1; i >= 0; i--) {
            var enemy = AirPlaneManager.enemies[i];
            var enemyRect = enemy.getRect();
            if (enemy.y >= AirPlaneManager.stageH + enemy.height || myRect.intersects(enemyRect)) {
                enemy.destroy();
                AirPlaneManager.enemies.splice(i, 1);
            }
            else {
                enemy.launchBullets(interval);
            }
        }
        AirPlaneManager.myPlane.launchBullets(interval);
    };
    AirPlaneManager.enemies = [];
    AirPlaneManager.frameCount = 0;
    AirPlaneManager.planes = [{ type: "ep_2", bullet: "epb_1", delay: 300, p: [{ x: 0, y: 0 }] }, { type: "ep_8", bullet: "BossBullet", delay: 300, p: [{ x: -38, y: 0 }, { x: 38, y: 0 }] }, { type: "ep_9" }, { type: "ep_10", bullet: "BossBullet", delay: 300, p: [{ x: -35, y: 0 }, { x: 35, y: 0 }] }, { type: "ep_13", bullet: "BossBullet", delay: 300, p: [{ x: -38, y: 5 }, { x: 38, y: 5 }] }, { type: "ep_14", bullet: "BossBullet", delay: 300, p: [{ x: -25, y: 0 }, { x: 25, y: 0 }] }, { type: "ep_15", bullet: "BossBullet", delay: 300, p: [{ x: -51, y: 0 }, { x: 51, y: 0 }] },];
    AirPlaneManager.myPlaneObj = { type: "my_2", bullet: "myb_1", delay: 200, p: [{ x: -58, y: -3 }, { x: 58, y: -3 }] };
    return AirPlaneManager;
})();
AirPlaneManager.prototype.__class__ = "AirPlaneManager";
