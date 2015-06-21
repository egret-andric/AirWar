/**
 *
 * @author 
 *
 */
class BulletManager {
    public static bullets: Bullet[] = [];
    public static myBullets: Bullet[] = [];
    private static stageW: number;
    private static stageH:number;
	public constructor() {
	}
    
    public static start(w:number, h:number):void{
        LoopManager.addLoop(BulletManager.loop);
        BulletManager.stageW = w;
        BulletManager.stageH = h;
    }
    
    public static loop(): void { 
        //检测敌法子弹
        var len: number = BulletManager.bullets.length;
        var myRect: egret.Rectangle = AirPlaneManager.myPlane.getRect();
        for(var i: number = len - 1;i >= 0;i--) { 
            var bullet: Bullet = BulletManager.bullets[i];
            var rect:egret.Rectangle = bullet.getRect();
            if(bullet.y >= BulletManager.stageH + bullet.height || myRect.intersects(rect)) { 
                bullet.destroy();
                BulletManager.bullets.splice(i, 1);
            }
        }
        //检测自己子弹
        len = BulletManager.myBullets.length;
        for(var j: number = len - 1;j >= 0;j--) { 
            var myBullet: Bullet = BulletManager.myBullets[j];
            var myBulletRect:egret.Rectangle = myBullet.getRect();
            if(myBulletRect.y < -myBulletRect.height) {//自己子弹超出编辑
                myBullet.destroy();
                BulletManager.myBullets.splice(j,1);
            } else { 
                var enemyLen: number = AirPlaneManager.enemies.length;
                for(var k: number = enemyLen - 1;k >= 0;k--) { 
                    var enemy: AirPlane = AirPlaneManager.enemies[k];
                    var myBulletRect:egret.Rectangle = myBullet.getRect();
                    if(myBulletRect.intersects(enemy.getRect())) {//打中敌机
                        enemy.destroy();
                        AirPlaneManager.enemies.splice(k,1);
                    }
                }
            }
        }
    }
    
    public static addBullet(bullet:Bullet): void {
        BulletManager.bullets.push(bullet);
    }
    
    public static addMyBullet(bullet:Bullet): void {
        BulletManager.myBullets.push(bullet);
    }
}
