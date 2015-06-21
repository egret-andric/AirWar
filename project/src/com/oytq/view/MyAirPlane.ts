/**
 *
 * @author 
 *
 */
class MyAirPlane extends AirPlane{
	public constructor(type:string, speed:number, bulletType:string, bulletSpeed:number, bulletDelay:number,launchPoints:Object[]) {
        super(type, speed, bulletType, bulletSpeed, bulletDelay, launchPoints);
	}
    
    protected launchBullet(x:number, y:number): void {
        var bullet: Bullet = Bullet.valueOf(this.bulletType,this.bulletSpeed);
        bullet.x = this.x + x;
        bullet.y = this.y + y;
        BulletManager.addMyBullet(bullet);
        LayerManager.getLayer(LayerManager.BULLET_LAYER).addChild(bullet);
        var endY: number = -bullet.height;
        bullet.launch(new egret.Point(bullet.x, bullet.y), new egret.Point(bullet.x, endY));
    }
    
    protected checkMax(): Boolean { 
        return false;
    }
}
