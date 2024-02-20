function buildStaticCollisions() {
        for(var i=0; i<tilelayers.length; i++) {
            var tilelayer = tilelayers[i];
            for(index in tilelayer.data) {
                var gid = tilelayer.data[index];
                var prop = getTileProperties(gid);
                var collision = staticCollision[index];
                if(!collision)
                    collision = {};
                
                var pos = ['left', 'top', 'right', 'bottom'];
                
                if(prop.collision) {
                    collision.whole = true;
                }
                
                for(var p in pos) {
                    var propName = 'collision'+capitalise(pos[p]);
                    if(prop[propName])
                        collision[propName] = parseInt(prop[propName]);
                    var propName = 'pass'+capitalise(pos[p]);
                    if(prop[propName])
                        collision[propName] = parseInt(prop[propName]);
                }
                
                staticCollision[index] = collision;
            }
        };
    }