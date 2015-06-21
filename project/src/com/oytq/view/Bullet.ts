/**
 *
 * @author 
 *
 */
class Bullet extends MoveObject{
    private type: string;
    private bmp: egret.Bitmap;
    private static pool: Bullet[] = [];
    private static SIZE: number = 100;
	public constructor(type:string, speed:number) {
        super();
        this.init(type,speed);
	}
    
    public destroy(): void { 
        super.destroy();
        if(Bullet.pool.length < Bullet.SIZE) { 
            Bullet.pool.push(this);
        }
    }
    
    public static valueOf(type: string,speed: number): Bullet { 
        var result: Bullet;
        if(Bullet.pool.length > 0) {
            result = Bullet.pool.pop();
            result.init(type, speed);
        } else { 
            result = new Bullet(type, speed);
        }
        return result;
    }
    
    private init(type:string, speed:number): void {
        this.type = type;
        this.speed = speed;
        this.createBullet();
    }
    
    private createBullet(): void { 
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
