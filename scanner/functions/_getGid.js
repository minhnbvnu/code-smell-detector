function _getGid(x, y) {

        if(x < 0 || y < 0 || x >= map.width || y >= map.height)
            return;
        
        var index = x + y * this.width;
        return this.data[index];
    }