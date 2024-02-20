function getTileProperties(gid) {
        if(tileProp[gid]) {
            return tileProp[gid];
        }
        return {};
    }