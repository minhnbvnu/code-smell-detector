function MacroMap(name, json, functionMap) {
            var e_2, _a;
            var _this = _super.call(this, name, null) || this;
            try {
                for (var _b = __values(Object.keys(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var value = json[key];
                    var _d = __read((typeof (value) === 'string') ? [value] : value), func = _d[0], attrs = _d.slice(1);
                    var character = new Symbol_js_1.Macro(key, functionMap[func], attrs);
                    _this.add(key, character);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return _this;
        }