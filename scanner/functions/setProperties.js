function setProperties(node, properties) {
            var e_2, _a;
            try {
                for (var _b = __values(Object.keys(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_1 = _c.value;
                    var value = properties[name_1];
                    if (name_1 === 'texClass') {
                        node.texClass = value;
                        node.setProperty(name_1, value);
                    }
                    else if (name_1 === 'movablelimits') {
                        node.setProperty('movablelimits', value);
                        if (node.isKind('mo') || node.isKind('mstyle')) {
                            node.attributes.set('movablelimits', value);
                        }
                    }
                    else if (name_1 === 'inferred') {
                    }
                    else if (attrs.has(name_1)) {
                        node.setProperty(name_1, value);
                    }
                    else {
                        node.attributes.set(name_1, value);
                    }
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
        }