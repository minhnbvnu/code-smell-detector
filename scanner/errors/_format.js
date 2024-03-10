function _format(str, values, defaults, stream) {
                values = values || {};
                defaults = defaults || {};
                var i, j, val, split = false, arr, subset, key;
                stream = stream || o;
                var ele;
                for(i = 0; i < stream.length; i++) {
                    ele = stream[i];
                    if(ele.constructor === String) {
                        str = _append(str, ele, false);
                    }
                    else {
                        if(ele.variable.constructor == Array) {
                            // Case of nested token - only single valued for now
                            key = _format('', values, defaults, ele.variable);
                            val = select(key, values) || select(key, defaults);
                            str = str + val;
                        }
                        else {
                            val = select(ele.variable, values) || select(ele.variable, defaults);
                            if(val) {
                                var encode = !ele.dontencode;
                                if(val.constructor == Array) {
                                    // But is the token multivalued?
                                    if(val.length === 0 && ele.required) {
                                        throw {
                                            error: 'Token ' + ele.variable + ' not specified. Processed ' + str
                                        }
                                    }
                                    else if(val.length === 1) {
                                        if(!val[0] && ele.required) {
                                            throw {
                                                error: 'Token ' + ele.variable + ' not specified. Processed ' + str
                                            }
                                        }
                                        str = _append(str, val, encode);
                                    }
                                    else if(ele.multivalued) {
                                        if(ele.max) {
                                            if(val.length <= ele.max) {
                                                // Append as usual
                                                str = _append(str, val, encode);
                                            }
                                            else {
                                                // Split the values into multiple and append each
                                                if(split) {
                                                    throw {
                                                        error: 'Template can not have multiple single-valued params with multiple values'
                                                    }
                                                }
                                                else {
                                                    split = true;
                                                    // Split and continue.
                                                    arr = [];
                                                    subset = [];
                                                    var start = 0, end = ele.max;

                                                    // Remove duplicates
                                                    val = val.sort();
                                                    val = val.filter(function(v,i,o) {
                                                        return (i === 0) ||
                                                            v !== o[i-1];
                                                    });

                                                    for(j = 0; j < val.length/ele.max; j++) {
                                                        subset = val.slice(start, end);
                                                        arr.push(_append(str, subset, encode));
                                                        start += ele.max;
                                                        end += ele.max;
                                                    }
                                                    str = arr;
                                                }
                                            }
                                        }
                                        else {
                                            str = _append(str, val, encode);
                                        }
                                    }
                                    else {
                                        // Split if not already split. If already split, error
                                        if(split) {
                                            throw {
                                                error: 'Template can not have multiple single-valued params with multiple values'
                                            }
                                        }
                                        else {
                                            split = true;
                                            // Split and continue.
                                            arr = [];
                                            for(j = 0; j < val.length; j++) {
                                                arr.push(_append(str, val[j], encode));
                                            }
                                            str = arr;
                                        }
                                    }
                                }
                                else {
                                    str = _append(str, val, encode);
                                }
                            }
                            else if(ele.required) {
                                throw {
                                    error: 'Token ' + ele.variable + ' not specified. Processed ' + str
                                }
                            }
                        }
                    }
                }
                return str;
            }