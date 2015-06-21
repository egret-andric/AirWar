/**
 *
 * @author 
 *
 */
class LoopManager {
    private static funs: MyArray<HandleVO>;
    private static inited: Boolean;
    private static curTime: number;
    private static obj: Object;
	public constructor() {
	}
    
    public static init(stage:egret.Stage):void{
        if(LoopManager.inited) {
            return;
        }
        LoopManager.inited = true;
        LoopManager.funs = new MyArray<HandleVO>();
        LoopManager.curTime = egret.getTimer();
        stage.addEventListener(egret.Event.ENTER_FRAME,LoopManager.onFrame, stage);
    }
    
    public static onFrame(e:egret.Event): void {
        var len: number = LoopManager.funs.length;
        var time: number = egret.getTimer();
        var interval:number = time - LoopManager.curTime;
        LoopManager.curTime = time;
        for(var i: number = 0;i < len;i++) {
            var vo: HandleVO = LoopManager.funs.getEleByIndex(i);
            vo.execute(interval);
        }
    }
    
    public static addLoop(fun:Function, obj?:Object): void {
        var vo: HandleVO = HandleVO.valueOf(fun,obj);
        if(LoopManager.funs.search(vo) == null) {
                LoopManager.funs.push(vo);
        }else{
            vo.destroy();
        }
    }
     
    public static removeLoop(fun:Function, obj:Object): void {
        var vo: HandleVO = HandleVO.valueOf(fun,obj);
        var equalVO: HandleVO = LoopManager.funs.search(vo);
        if(equalVO != null) {
            var index: number = LoopManager.funs.indexOf(equalVO);
            LoopManager.funs.splice(index,1);
        }
    }   
}
