function _size ( v ) {

        var precision = 100; //Math.pow(10, 2);
        var i = Math.floor( Math.log( v ) / log1024 );
        return Math.round( v * precision / Math.pow( 1024, i ) ) / precision; // + ' ' + sizes[i];

    }