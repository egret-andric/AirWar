/**
 *
 * @author
 *
 */
var LayerManager = (function () {
    function LayerManager() {
    }
    var __egretProto__ = LayerManager.prototype;
    LayerManager.register = function (name, layer) {
        LayerManager.layers[name] = layer;
    };
    LayerManager.getLayer = function (name) {
        return LayerManager.layers[name];
    };
    LayerManager.MAP_LAYER = "MAP_LAYER";
    LayerManager.BULLET_LAYER = "BULLET_LAYER";
    LayerManager.AIRPLANE_LAYER = "AIRPLANE_LAYER";
    LayerManager.MY_PLANE_LAYER = "MY_PLANE_LAYER";
    LayerManager.layers = {};
    return LayerManager;
})();
LayerManager.prototype.__class__ = "LayerManager";
