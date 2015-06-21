/**
 *
 * @author 
 *
 */
class MyArray<T extends IEqual>{
    private arr: T[] = [];
	public constructor() {
	}
    
    public push(obj: T): void {
        this.arr.push(obj);
    }
    
    public pop(): void {
        this.arr.pop();
    }
    
    public splice(start:number, deleteCount:number): void {
        this.arr.splice(start,deleteCount);
    }
    
    public indexOf(obj: T): number {
        return this.arr.indexOf(obj);
    }
    
    public getEleByIndex(index:number): T {
        return this.arr[index]
    }
    
    public search(vo:T): T {
        var len: number = this.length;
        for(var i: number = 0;i < len;i++) {
            var ele:T = this.getEleByIndex(i);
            if(ele.equals(vo)) {
                return ele;
            }
        }
        return null;
    }
    
    public get length(): number {
        return this.arr.length;
    }
}
