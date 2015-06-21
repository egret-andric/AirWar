/**
 *
 * @author 
 *
 */
class AirPlane extends MoveObject{
    private bmp: egret.Bitmap;//飞机位图
    private type: string;
    protected bulletSpeed: number = 0;
    protected bulletType: string;
    private bulletDelay: number = 0;
    private static pool: AirPlane[] = [];
    private static SIZE: number = 20;
    private launchPoints: Object[];
    private interval: number = 0;//飞机距离上次发射子弹间隔时间
    private bulletNum: number = 0;
    private maxBulletNum: number = 3;
    /**
    * @param type:String 飞机类型
    * @param speed:String 飞机飞行速度
    * @param bulletType:String  子弹类型
    * @param bulletSpeed:String 子弹速度
    * @param bulletDelay:String 子弹发射频率
    * 
    */
	public constructor(type:string, speed:number, bulletType:string, bulletSpeed:number, bulletDelay:number,launchPoints:Object[]) {
        super();
        this.init(type, speed, bulletType, bulletSpeed, bulletDelay,launchPoints);
	}
    
    public init(type:string, speed:number, bulletType:string, bulletSpeed:number, bulletDelay:number, launchPoints:Object[]): void {
        this.type = type;
        this.speed = speed;
        this.bulletType = bulletType;
        this.bulletSpeed = bulletSpeed;
        this.bulletDelay = bulletDelay;
        this.launchPoints = launchPoints;
        this.createAirPlane();
        this.maxBulletNum = Math.ceil(Math.random() * 3);
    }
    
    protected checkMax(): Boolean { 
        return this.bulletNum > this.maxBulletNum;
    }
    
    public launchBullets(interval: number): void { 
        if(this.bulletType == null || this.checkMax() || this.y < 0) { 
            return;
        }
        this.interval += interval;
        if(this.interval > this.bulletDelay) { 
            this.interval = 0;
            this.bulletNum++;
            var len: number = this.launchPoints.length;
            for(var i: number = 0;i < len;i++) { 
                var p: Object = this.launchPoints[i];
                var x: number = p["x"];
                var y: number = p["y"];
                this.launchBullet(x, y);
            }
        }
    }
    
    protected launchBullet(x:number, y:number): void {
        var bullet: Bullet = Bullet.valueOf(this.bulletType,this.bulletSpeed);
        bullet.x = this.x + x;
        bullet.y = this.y + y;
        BulletManager.addBullet(bullet);
        LayerManager.getLayer(LayerManager.BULLET_LAYER).addChild(bullet);
        var endY: number = this.stage.stageHeight + bullet.height;
        bullet.launch(new egret.Point(bullet.x, bullet.y), new egret.Point(bullet.x, endY));
    }
    
    
    
    public destroy(): void { 
        super.destroy();
        if(AirPlane.pool.length < AirPlane.SIZE) { 
            AirPlane.pool.push(this);
            this.bulletNum = 0;
        }
    }
        
    public static valueOf(type:string, speed:number, bulletType:string, bulletSpeed:number, bulletDelay:number, launchPoints:Object[]): AirPlane { 
        var result: AirPlane;
        if(AirPlane.pool.length > 0) {
            result = AirPlane.pool.pop();
            result.init(type, speed, bulletType, bulletSpeed, bulletDelay,launchPoints);
        } else { 
            result = new AirPlane(type, speed, bulletType, bulletSpeed, bulletDelay,launchPoints);
        }
        return result;
    }
    
    private createAirPlane():void{
        if(this.bmp == null) { 
            this.bmp = new egret.Bitmap();
            this.addChild(this.bmp);
        }
        var texture:egret.Texture = RES.getRes(this.type);
        this.bmp.texture = texture;
        this.anchorOffsetX = texture.textureWidth / 2;
        this.anchorOffsetY = texture.textureHeight / 2;
    }
    
}
