function CharacterMap(name, parser, json) {
            var e_1, _a;
            var _this = _super.call(this, name, parser) || this;
            try {
                for (var _b = __values(Object.keys(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var value = json[key];
                    var _d = __read((typeof (value) === 'string') ? [value, null] : value, 2), char = _d[0], attrs = _d[1];
                    var character = new Symbol_js_1.Symbol(key, char, attrs);
                    _this.add(key, character);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return _this;
        }