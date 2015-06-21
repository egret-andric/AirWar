/**
 *
 * @author 
 *
 */
class LayerManager {
    public static MAP_LAYER:string = "MAP_LAYER";
    public static BULLET_LAYER: string = "BULLET_LAYER";
    public static AIRPLANE_LAYER: string = "AIRPLANE_LAYER";
    public static MY_PLANE_LAYER: string = "MY_PLANE_LAYER";
    public static layers: Object = {};
	public constructor() {
	}
    
    public static register(name:string, layer:egret.DisplayObjectContainer): void { 
        LayerManager.layers[name] = layer;
    }
    
    public static getLayer(name:string): egret.DisplayObjectContainer { 
        return LayerManager.layers[name]
    }
}
