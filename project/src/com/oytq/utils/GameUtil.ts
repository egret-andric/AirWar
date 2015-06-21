/**
*
* @author oytq
*
*/
class GameUtil {
    public static createBitmap(texture: egret.Texture): egret.Bitmap {
        var bmp: egret.Bitmap = new egret.Bitmap();
        bmp.texture = texture;
        return bmp;
    }
}
