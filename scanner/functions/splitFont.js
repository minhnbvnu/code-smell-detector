function splitFont(name) {
        var e_8, _a, e_9, _b;
        var parts = splitSpaces(this.styles[name]);
        var value = {
            style: '', variant: [], weight: '', stretch: '',
            size: '', family: '', 'line-height': ''
        };
        try {
            for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                var part = parts_1_1.value;
                value.family = part;
                try {
                    for (var _c = (e_9 = void 0, __values(Object.keys(FONT))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var name_1 = _d.value;
                        if ((Array.isArray(value[name_1]) || value[name_1] === '') && part.match(FONT[name_1])) {
                            if (name_1 === 'size') {
                                var _e = __read(part.split(/\//), 2), size = _e[0], height = _e[1];
                                value[name_1] = size;
                                if (height) {
                                    value['line-height'] = height;
                                }
                            }
                            else if (value.size === '') {
                                if (Array.isArray(value[name_1])) {
                                    value[name_1].push(part);
                                }
                                else {
                                    value[name_1] = part;
                                }
                            }
                        }
                    }
                }
                catch (e_9_1) {
                    e_9 = { error: e_9_1 };
                }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return))
                            _b.call(_c);
                    }
                    finally {
                        if (e_9)
                            throw e_9.error;
                    }
                }
            }
        }
        catch (e_8_1) {
            e_8 = { error: e_8_1 };
        }
        finally {
            try {
                if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return))
                    _a.call(parts_1);
            }
            finally {
                if (e_8)
                    throw e_8.error;
            }
        }
        saveFontParts(name, value);
        delete this.styles[name];
    }