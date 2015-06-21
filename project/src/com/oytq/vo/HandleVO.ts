/**
 *
 * @author 
 *
 */
class HandleVO implements IEqual{
    public fun: Function;
    public obj: Object;
    public static pool: HandleVO[] = [];
    private static SIZE:number = 10;
	public constructor(fun:Function, obj:Object) {
        this.fun = fun;
        this.obj = obj;
	}
    
    public equals(vo: HandleVO): Boolean { 
        if(this.obj != vo.obj) {
            return false;
        }
        if(this.fun != vo.fun){
            return false; 
        }
        return true;
    }
    
    public execute(interval:number): void { 
        this.fun.apply(this.obj, [interval]);
    }
    
    public static valueOf(fun: Function,obj: Object): HandleVO {
        var result: HandleVO = null;
        if(HandleVO.pool.length > 0) {
            result = HandleVO.pool.pop();
            result.fun = fun;
            result.obj = obj;
        } else {
            result = new HandleVO(fun,obj);
        }
        return result;
    }
    
    public destroy(): void {
        if(HandleVO.pool.length < HandleVO.SIZE) {
            if(HandleVO.pool.indexOf(this) == -1) {
                this.fun = null;
                this.obj = null;
                HandleVO.pool.push(this);
            }
        }
    }
}
