function reconstruct( obj ) {

        var attrs = ['pageX', 'pageY', 'clientX', 'clientY', 'srcElement', 'target'],
            newObj = {};

        if( obj ) {

            for( var i = 0, key, val; key = attrs[i]; i++ ) {
                val=obj[ key ];
                val && (newObj[ key ] = val);
            }

        }

        return newObj;

    }