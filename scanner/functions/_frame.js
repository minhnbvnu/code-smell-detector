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