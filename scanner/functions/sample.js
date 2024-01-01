function sample () {

        var _value = 0;

        function _set ( v ) {
            _value = v;
        }

        return {
            set: _set,
            value: function () {
                return _value;
            }
        };

    }