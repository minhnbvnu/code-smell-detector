function readKeyval(text) {
            var _a, _b;
            var options = {};
            var rest = text;
            var end, key, val;
            while (rest) {
                _a = __read(readValue(rest, ['=', ',']), 3), key = _a[0], end = _a[1], rest = _a[2];
                if (end === '=') {
                    _b = __read(readValue(rest, [',']), 3), val = _b[0], end = _b[1], rest = _b[2];
                    val = (val === 'false' || val === 'true') ?
                        JSON.parse(val) : val;
                    options[key] = val;
                }
                else if (key) {
                    options[key] = true;
                }
            }
            return options;
        }