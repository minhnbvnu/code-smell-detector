function _h ( f, c ) {
        return function () {
            c.apply( this, arguments );
            f.apply( this, arguments );
        };
    }