function parse_CreateStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 6) === "create") {
                    result0 = "create";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"create\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 5) === "table") {
                            result2 = "table";
                            advance(pos, 5);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"table\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_NonAliasSource();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_Connector();
                                        result6 = result6 !== null ? result6 : "";
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = [];
                                                result9 = parse_Verb();
                                                while (result9 !== null) {
                                                    result8.push(result9);
                                                    result9 = parse_Verb();
                                                }
                                                if (result8 !== null) {
                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
                                                } else {
                                                    result0 = null;
                                                    pos = clone(pos1);
                                                }
                                            } else {
                                                result0 = null;
                                                pos = clone(pos1);
                                            }
                                        } else {
                                            result0 = null;
                                            pos = clone(pos1);
                                        }
                                    } else {
                                        result0 = null;
                                        pos = clone(pos1);
                                    }
                                } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s, connector, v) {

                        var s = {
                            type: 'create',
                            name: s.name,
                            line: line,
                            connector: connector || 'http'
                        };
                        for(i = 0; i < v.length; i++) {
                            //check verb-connector match.
                            switch(connector){
                                case 'http':
                                    var validVerbs = ['get', 'post', 'put', 'delete', 'patch'];
                                    if(validVerbs.indexOf(v[i].method) == -1){
                                        throw new this.SyntaxError("Line " + line + ": unknown verb method " + v[i].method + " found.");
                                    }
                                    break;
                            }
                            s[v[i].type] = v[i];
                            delete v[i].type;
                        }
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[4], result0[6], result0[8]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }