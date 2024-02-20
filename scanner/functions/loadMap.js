function loadMap(src, scene, callback) {
        tileProp = {};
        map = null;
        tilelayers = [];
        _scene = null;
        staticCollision = {};
        sjs.map.activeObjects = [];
        sjs.map.positions = [];
        
        load(src, function(text) {
            jsonCallback(JSON.parse(text), callback);
        });
        _scene = scene;
    }