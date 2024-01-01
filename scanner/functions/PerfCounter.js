function PerfCounter ( id, group ) {

        var _id = id,
            _time,
            _value = 0,
            _total = 0,
            _averageValue = 0,
            _accumValue = 0,
            _accumStart = performance.now(),
            _accumSamples = 0,
            _dom = document.createElement( 'div' ),
            _spanId = document.createElement( 'span' ),
            _spanValue = document.createElement( 'div' ),
            _spanValueText = document.createTextNode( '' ),
            _def = _settings ? _settings.values[ _id.toLowerCase() ] : null,
            _graph = new Graph( _dom, _id, _def ),
            _started = false;

        _spanId.className = 'rs-counter-id';
        _spanId.textContent = ( _def && _def.caption ) ? _def.caption : _id;

        _spanValue.className = 'rs-counter-value';
        _spanValue.appendChild( _spanValueText );

        _dom.appendChild( _spanId );
        _dom.appendChild( _spanValue );
        if ( group ) group.div.appendChild( _dom );
        else _div.appendChild( _dom );

        _time = performance.now();

        function _average ( v ) {
            if ( _def && _def.average ) {
                _accumValue += v;
                _accumSamples++;
                var t = performance.now();
                if ( t - _accumStart >= ( _def.avgMs || 1000 ) ) {
                    _averageValue = _accumValue / _accumSamples;
                    _accumValue = 0;
                    _accumStart = t;
                    _accumSamples = 0;
                }
            }
        }

        function _start () {
            _time = performance.now();
            if( _settings.userTimingAPI ) performance.mark( _id + '-start' );
            _started = true;
        }

        function _end () {
            _value = performance.now() - _time;
            if( _settings.userTimingAPI ) {
                performance.mark( _id + '-end' );
                if( _started ) {
                    performance.measure( _id, _id + '-start', _id + '-end' );
                }
            }
            _average( _value );
        }

        function _tick () {
            _end();
            _start();
        }

        function _draw () {
            var v = ( _def && _def.average ) ? _averageValue : _value;
            _spanValueText.nodeValue = Math.round( v * 100 ) / 100;
            var a = ( _def && ( ( _def.below && _value < _def.below ) || ( _def.over && _value > _def.over ) ) );
            _graph.draw( _value, a );
            _dom.className = a ? 'rs-counter-base alarm' : 'rs-counter-base';

        }

        function _frame () {
            var t = performance.now();
            var e = t - _time;
            _total++;
            if ( e > 1000 ) {
                if ( _def && _def.interpolate === false ) {
                    _value = _total;
                } else {
                    _value = _total * 1000 / e;
                }
                _total = 0;
                _time = t;
                _average( _value );
            }
        }

        function _set ( v ) {
            _value = v;
            _average( _value );
        }

        return {
            set: _set,
            start: _start,
            tick: _tick,
            end: _end,
            frame: _frame,
            value: function () {
                return _value;
            },
            draw: _draw
        };

    }