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