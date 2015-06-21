/**
 *
 * @author 
 *
 */
class AirPlaneManager {
    public static enemies: AirPlane[] = [];
    public static myPlane: MyAirPlane;
    private static frameCount: number = 0;
    private static stageW: number;
    private static stageH:number;
    private static planes: Object[] = [{ type: "ep_2",bullet: "epb_1",delay: 300,p: [{ x: 0,y: 0 }]},
                                        {type:"ep_8", bullet:"BossBullet",delay: 300,p: [{ x: -38,y: 0 },{x: 38,y: 0 }]},
                                        {type:"ep_9"},
                                        {type:"ep_10", bullet:"BossBullet",delay: 300,p: [{ x: -35,y: 0 },{x: 35,y: 0 }]},
                                        {type:"ep_13", bullet:"BossBullet",delay: 300,p: [{ x: -38,y: 5 },{x: 38,y: 5 }]},
                                        {type:"ep_14", bullet:"BossBullet",delay: 300,p: [{ x: -25,y: 0 },{x: 25,y: 0 }]},
                                        {type:"ep_15", bullet:"BossBullet",delay: 300,p: [{ x: -51,y: 0 },{x: 51,y: 0 }]},
                                      ];
    private static myPlaneObj: Object = {type:"my_2", bullet:"myb_1",delay: 200,p: [{ x: -58,y: -3 },{x: 58,y: -3 }]};
    public static start(w:number, h:number): void { 
        LoopManager.addLoop(AirPlaneManager.loop);
        AirPlaneManager.createMyPlane(w, h);
        AirPlaneManager.stageW = w;
        AirPlaneManager.stageH = h;
    }
    
    private static createMyPlane(w:number, h:number): void { 
        var obj: Object = AirPlaneManager.myPlaneObj;
        var plane:MyAirPlane = new MyAirPlane(obj["type"], 0, obj["bullet"], 400, obj["delay"], obj["p"]);
        plane.x = w / 2;
        plane.y = h - plane.height / 2;
        AirPlaneManager.myPlane = plane;
        LayerManager.getLayer(LayerManager.MY_PLANE_LAYER).addChild(plane);
        plane.addEventListener(egret.TouchEvent.TOUCH_MOVE,AirPlaneManager.onMove,plane);
        plane.touchEnabled = true;
    }
    
    private static onMove(e:egret.TouchEvent): void { 
        AirPlaneManager.myPlane.x = e.stageX;
        AirPlaneManager.myPlane.y = e.stageY;
    }
    
    private static addEnemy(): void { 
        if(Math.random() > 0.5) { 
            var len:number = AirPlaneManager.planes.length;
            var index: number = Math.floor(Math.random() * len);
            var obj: Object = AirPlaneManager.planes[index];
            var enemy: AirPlane = AirPlane.valueOf(obj["type"],150,obj["bullet"],300,obj["delay"], obj["p"]);
            AirPlaneManager.enemies.push(enemy);
            var start: egret.Point = AirPlaneManager.getStart(enemy);
            var end: egret.Point = new egret.Point(start.x, AirPlaneManager.stageH + enemy.height);
            enemy.launch(start, end);
            LayerManager.getLayer(LayerManager.AIRPLANE_LAYER).addChild(enemy);
        }
    }
    
    private static getStart(enemy: AirPlane): egret.Point { 
        var start: egret.Point = new egret.Point();
        var x:number = Math.random() * AirPlaneManager.stageW;
        x = Math.max(enemy.width / 2, x);
        x = Math.min(AirPlaneManager.stageW - enemy.width / 2, x);
        start.x = x;
        start.y = -enemy.height;
        return start;
    }
    
    private static loop(interval:number): void {
        AirPlaneManager.frameCount++;
        if(AirPlaneManager.frameCount % 50 == 0) { 
            AirPlaneManager.addEnemy();
        }
        var myRect: egret.Rectangle = AirPlaneManager.myPlane.getRect();
        var len: number = AirPlaneManager.enemies.length;
        for(var i: number = len - 1;i >= 0;i--) { 
            var enemy: AirPlane = AirPlaneManager.enemies[i];
            var enemyRect:egret.Rectangle = enemy.getRect();
            if(enemy.y >= AirPlaneManager.stageH + enemy.height || myRect.intersects(enemyRect)) {
                enemy.destroy();
                AirPlaneManager.enemies.splice(i,1);
            } else { 
                enemy.launchBullets(interval);
            }
        }
        AirPlaneManager.myPlane.launchBullets(interval);
    }
}
