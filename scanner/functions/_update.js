function _update () {

        iterateKeys( _settings.plugins, function ( j ) {
            _settings.plugins[ j ].update();
        } );

        iterateKeys( _perfCounters, function ( j ) {
            _perfCounters[ j ].draw();
        } );

        if ( _settings && _settings.fractions ) {
            iterateKeys( _settings.fractions, function ( j ) {
                var f = _settings.fractions[ parseInt( j, 10 ) ];
                var v = [];
                var base = _perfCounters[ f.base.toLowerCase() ];
                if ( base ) {
                    base = base.value();
                    iterateKeys( _settings.fractions[ j ].steps, function ( k ) {
                        var s = _settings.fractions[ j ].steps[ parseInt( k, 10 ) ].toLowerCase();
                        var val = _perfCounters[ s ];
                        if ( val ) {
                            v.push( val.value() / base );
                        }
                    } );
                }
                f.graph.draw( v );
            } );
        }

        /*if( _height != _div.clientHeight ) {
            _height = _div.clientHeight;
            _base.style.height = _height + 2 * _elHeight + 'px';
        console.log( _base.clientHeight );
        }*/

    }