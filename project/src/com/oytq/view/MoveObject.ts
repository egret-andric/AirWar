/**
 *
 * @author 
 *
 */
class MoveObject extends egret.Sprite{
    protected tween: egret.Tween;
    protected speed: number = 0;
	public constructor() {
        super();
	}
    
    public launch(start:egret.Point, end:egret.Point): void { 
        this.x = start.x;
        this.y = start.y;
        var distance: number = egret.Point.distance(start,end);
        var t: number = distance * 1000 / this.speed;
        this.tween = egret.Tween.get(this);
        this.tween.to({x:end.x, y:end.y}, t);
    }
    
    public getRect(): egret.Rectangle { 
        var rect: egret.Rectangle = new egret.Rectangle();
        rect.x = this.x - this.anchorOffsetX;
        rect.y = this.y - this.anchorOffsetY;
        rect.width = this.width;
        rect.height = this.height;
        return rect;
    }
    
    public destroy(): void { 
        if(this.tween != null) { 
            this.tween.setPaused(true);
            this.tween = null;
        }
        if(this.parent != null) { 
            this.parent.removeChild(this);
        }
    }
}
