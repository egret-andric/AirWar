/**
 *
 * @author andric
 *
 */
//module com.oytq.view {
    class BgMap extends egret.DisplayObjectContainer {
        private speed: number = 0.08;//每毫秒移动像素速度
        private bgTexture: egret.Texture;
        private bmpArr: egret.Bitmap[];
        public constructor(bg: egret.Texture, stageH:number) {
            super();
            this.bgTexture = bg;
            this.init(stageH);
        }

        private init(stageH:number) {
            var count = Math.ceil(stageH / this.bgTexture.textureHeight) + 1;
            this.bmpArr = [];
            for(var i: number = 0;i < count;i++) {
                var bmp: egret.Bitmap = GameUtil.createBitmap(this.bgTexture);
                bmp.y = (i - 1) * bmp.height;
                this.addChild(bmp);
                this.bmpArr.push(bmp);
            }
        }

        public start(): void {
            LoopManager.addLoop(this.scroll, this);
        }
        
        public stop(): void {
            LoopManager.removeLoop(this.scroll, this);
        }
        
        
        private scroll(interval:number): void {
            var v: number = interval * this.speed;
            var len: number = this.bmpArr.length;
            var removes: egret.Bitmap[];
            for(var i: number = 0;i < len;i++) { 
                var map: egret.Bitmap = this.bmpArr[i];
                map.y += v;
                if(map.y > this.stage.stageHeight) { 
                    if(removes == null) {
                        removes = [];
                    }
                    removes.push(map);
                }
            }
            if(removes != null) {
                var removeLen: number = removes.length;
                for(var j: number = 0;j < removeLen;j++) {
                    var removeMap: egret.Bitmap = removes[j];
                    removeMap.y = this.bmpArr[0].y - this.bmpArr[0].height;
                    var index: number = this.bmpArr.indexOf(removeMap);
                    this.bmpArr.splice(index,1);
                    this.bmpArr.unshift(removeMap);
                }
            }
        }
        
    }
//}