function _draw () {
            var v = ( _def && _def.average ) ? _averageValue : _value;
            _spanValueText.nodeValue = Math.round( v * 100 ) / 100;
            var a = ( _def && ( ( _def.below && _value < _def.below ) || ( _def.over && _value > _def.over ) ) );
            _graph.draw( _value, a );
            _dom.className = a ? 'rs-counter-base alarm' : 'rs-counter-base';

        }