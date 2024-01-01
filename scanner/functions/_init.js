function _init () {

        if ( _settings.plugins ) {
            if ( !_settings.values ) _settings.values = {};
            if ( !_settings.groups ) _settings.groups = [];
            if ( !_settings.fractions ) _settings.fractions = [];
            for ( var j = 0; j < _settings.plugins.length; j++ ) {
                _settings.plugins[ j ].attach( _perf );
                iterateKeys( _settings.plugins[ j ].values, function ( k ) {
                    _settings.values[ k ] = _settings.plugins[ j ].values[ k ];
                } );
                _settings.groups = _settings.groups.concat( _settings.plugins[ j ].groups );
                _settings.fractions = _settings.fractions.concat( _settings.plugins[ j ].fractions );
            }
        } else {
            _settings.plugins = {};
        }

        _base = document.createElement( 'div' );
        _base.className = 'rs-base';
        _div = document.createElement( 'div' );
        _div.className = 'rs-container';
        _div.style.height = 'auto';
        _base.appendChild( _div );
        document.body.appendChild( _base );

        if ( !_settings ) return;

        if ( _settings.groups ) {
            iterateKeys( _settings.groups, function ( j ) {
                var g = _settings.groups[ parseInt( j, 10 ) ];
                var div = document.createElement( 'div' );
                div.className = 'rs-group';
                g.div = div;
                var h1 = document.createElement( 'h1' );
                h1.textContent = g.caption;
                h1.addEventListener( 'click', function ( e ) {
                    this.classList.toggle( 'hidden' );
                    e.preventDefault();
                }.bind( div ) );
                _div.appendChild( h1 );
                _div.appendChild( div );
            } );
        }

        if ( _settings.fractions ) {
            iterateKeys( _settings.fractions, function ( j ) {
                var f = _settings.fractions[ parseInt( j, 10 ) ];
                var div = document.createElement( 'div' );
                div.className = 'rs-fraction';
                var legend = document.createElement( 'div' );
                legend.className = 'rs-legend';

                var h = 0;
                iterateKeys( _settings.fractions[ j ].steps, function ( k ) {
                    var p = document.createElement( 'p' );
                    p.textContent = _settings.fractions[ j ].steps[ k ];
                    p.style.color = _colours[ h ];
                    legend.appendChild( p );
                    h++;
                } );
                div.appendChild( legend );
                div.style.height = h * _elHeight + 'px';
                f.div = div;
                var graph = new StackGraph( div, h );
                f.graph = graph;
                _div.appendChild( div );
            } );
        }

    }