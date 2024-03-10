function collides(x, y) {
        var _x = x / map.tilewidth;
        var _y = y / map.tileheight;
        if(x < 0 || y < 0 || _x > map.width || _y > map.height)
            return true;
        var index = map.width * (_y | 0) + (_x | 0);

        var collision = staticCollision[String(index)];

        if(!collision)
            return false;
        
        if(collision.passRight) {
            var col = x % map.tilewidth >=  map.tilewidth - collision.passRight;
            if(col)
                return false;
        }
        if(collision.passLeft) {
            var col = x % map.tilewidth <=  collision.passLeft;
            if(col)
                return false;
        }
        if(collision.passTop) {
            var col = y % map.tileheight <= collision.passTop;
            if(col)
                return false;
        }
        if(collision.passBottom) {
            var col = y % map.tileheight >= map.tileheight - collision.passBottom;
            if(col)
                return false;
        }
        
        if(collision.whole) {
            return true;
        }
        
        if(collision.collisionRight) {
            var col = x % map.tilewidth >=  map.tilewidth - collision.collisionRight;
            if(col)
                return true;
        }
        if(collision.collisionLeft) {
            var col = x % map.tilewidth <=  collision.collisionLeft;
            if(col)
                return true;
        }
        if(collision.collisionTop) {
            var col = y % map.tileheight <= collision.collisionTop;
            if(col)
                return true;
        }
        if(collision.collisionBottom) {
            var col = y % map.tileheight >= map.tileheight - collision.collisionBottom;
            if(col)
                return true;
        }
        
        return false;
    }