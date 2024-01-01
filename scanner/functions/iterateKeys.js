function iterateKeys ( array, callback ) {
        var keys = Object.keys( array );
        for ( var j = 0, l = keys.length; j < l; j++ ) {
            callback( keys[ j ] );
        }
    }