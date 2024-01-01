function _perf ( idArg ) {

        var id = idArg.toLowerCase();
        if ( id === undefined ) id = 'default';
        if ( _perfCounters[ id ] ) return _perfCounters[ id ];

        var group = null;
        if ( _settings && _settings.groups ) {
            iterateKeys( _settings.groups, function ( j ) {
                var g = _settings.groups[ parseInt( j, 10 ) ];
                if ( !group && g.values.indexOf( id.toLowerCase() ) !== -1 ) {
                    group = g;
                }
            } );
        }

        var p = new PerfCounter( id, group );
        _perfCounters[ id ] = p;
        return p;

    }