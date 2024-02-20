function parse_URITemplate() {
        var result0, result1;
        var pos0;

        pos0 = pos;
        result0 = [];
        result1 = parse_literal();
        if (result1 === null) {
          result1 = parse_expression();
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_literal();
          if (result1 === null) {
            result1 = parse_expression();
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, c) {
            var o = [], i, current = 0;
            o.push(c[0]);
            for(i = 1; i < c.length; i++) {
                if(c[i].constructor === String && o[current].constructor === String) {
                    o[current] = o[current] + c[i];
                }
                else {
                    o.push(c[i]);
                    current++;
                }
            }
            function select(path, obj) {
                var splits = !path ? [] : path.split('.');
                var curr = obj;
                for(var i = 0; i < splits.length; i++) {
                    if(curr[splits[i]]) {
                        curr = curr[splits[i]];
                        if(i < splits.length - 1 && curr.constructor === Array && curr.length > 0) {
                            curr = curr[0];
                        }
                    }
                    else {
                        return null;
                    }
                }
                return curr;
            }
            function _append(str, val, encode) {
                var j;
                if(str.constructor === Array) {
                    for(j = 0; j < str.length; j++) {
                        str[j] = str[j] + (encode ? encodeURIComponent(val) : val);
                    }
                }
                else {
                    str = str + (encode ? encodeURIComponent(val) : val);
                }
                return str;
            }
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
            return {
                format: function(values, defaults) {
                    return _format('', values, defaults);
                },
                merge: function() {
                    for(i = 0; i < o.length; i++) {
                        if(o[i].merge) {
                            return o[i].merge;
                        }
                    }
                    return 'field';
                },
                stream: o
            }
        })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }