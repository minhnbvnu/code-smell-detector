function setKey(obj, keys, value) {
                let o = obj;
                if (!configuration['dot-notation'])
                    keys = [keys.join('.')];
                keys.slice(0, -1).forEach(function (key) {
                    key = sanitizeKey(key);
                    if (typeof o === 'object' && o[key] === undefined) {
                        o[key] = {};
                    }
                    if (typeof o[key] !== 'object' || Array.isArray(o[key])) {
                        if (Array.isArray(o[key])) {
                            o[key].push({});
                        }
                        else {
                            o[key] = [o[key], {}];
                        }
                        o = o[key][o[key].length - 1];
                    }
                    else {
                        o = o[key];
                    }
                });
                const key = sanitizeKey(keys[keys.length - 1]);
                const isTypeArray = checkAllAliases(keys.join('.'), flags.arrays);
                const isValueArray = Array.isArray(value);
                let duplicate = configuration['duplicate-arguments-array'];
                if (!duplicate && checkAllAliases(key, flags.nargs)) {
                    duplicate = true;
                    if ((!isUndefined(o[key]) && flags.nargs[key] === 1) || (Array.isArray(o[key]) && o[key].length === flags.nargs[key])) {
                        o[key] = undefined;
                    }
                }
                if (value === increment()) {
                    o[key] = increment(o[key]);
                }
                else if (Array.isArray(o[key])) {
                    if (duplicate && isTypeArray && isValueArray) {
                        o[key] = configuration['flatten-duplicate-arrays'] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
                    }
                    else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
                        o[key] = value;
                    }
                    else {
                        o[key] = o[key].concat([value]);
                    }
                }
                else if (o[key] === undefined && isTypeArray) {
                    o[key] = isValueArray ? value : [value];
                }
                else if (duplicate && !(o[key] === undefined ||
                    checkAllAliases(key, flags.counts) ||
                    checkAllAliases(key, flags.bools))) {
                    o[key] = [o[key], value];
                }
                else {
                    o[key] = value;
                }
            }