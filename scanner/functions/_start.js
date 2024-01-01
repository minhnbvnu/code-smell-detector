function _start () {
            _time = performance.now();
            if( _settings.userTimingAPI ) performance.mark( _id + '-start' );
            _started = true;
        }