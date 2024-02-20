function parse_SelectStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Select();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_ColumnsClause();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.substr(pos.offset, 4) === "from") {
                                    result4 = "from";
                                    advance(pos, 4);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"from\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_FromClause();
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = [];
                                                result9 = parse_WhereClause();
                                                while (result9 !== null) {
                                                    result8.push(result9);
                                                    result9 = parse_WhereClause();
                                                }
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_Limit();
                                                        result10 = result10 !== null ? result10 : "";
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                result12 = parse_Offset();
                                                                result12 = result12 !== null ? result12 : "";
                                                                if (result12 !== null) {
                                                                    result13 = parse_insig();
                                                                    if (result13 !== null) {
                                                                        result14 = parse_Timeout();
                                                                        result14 = result14 !== null ? result14 : "";
                                                                        if (result14 !== null) {
                                                                            result15 = parse_insig();
                                                                            if (result15 !== null) {
                                                                                result16 = parse_MinDelay();
                                                                                result16 = result16 !== null ? result16 : "";
                                                                                if (result16 !== null) {
                                                                                    result17 = parse_insig();
                                                                                    if (result17 !== null) {
                                                                                        result18 = parse_MaxDelay();
                                                                                        result18 = result18 !== null ? result18 : "";
                                                                                        if (result18 !== null) {
                                                                                            result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18];
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
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s, c, fc, wc, l, o, timeout, minDelay, maxDelay) {
                        var s = {
                            type: s.type,
                            line: s.line,
                            fromClause: fc,
                            columns: c,
                            whereCriteria: wc[0]
                        };
                        if(l) {
                            s.limit = l;
                        }
                        if(o) {
                            s.offset = o;
                        }
                        if(timeout) {
                            s.timeout = timeout;
                        }
                        if(minDelay) {
                            s.minDelay = minDelay;
                        }
                        if(maxDelay) {
                            s.maxDelay = maxDelay;
                        }
                        s.id = id;
                        if(c && c.length > 0 && c[0].alias) {
                            s.usingColumnAliases = true
                        }

                        // Extras from where clause - there are non-literal args of UDFs in the where clause
                        if(s.whereCriteria && typeOf(s.columns) === 'array') {
                            for(var i = 0; i < s.whereCriteria.length; i++) {
                                var where = s.whereCriteria[i];
                                if(where.operator === 'udf') {
                                    for(var j = 0; j < where.args.length; j++) {
                                        if(where.args[j].type === 'column') {
                                            // If this column is not already selected, included it now.
                                            for(var c = 0; c < s.columns.length; c++) {
                                                if(s.columns[c].name === where.args[j].name) {
                                                    if(s.columns[c].alias) {
                                                        where.args[j].alias = s.columns[c].alias
                                                        delete where.args[j].index;
                                                    }
                                                    else {
                                                        where.args[j].index = c;
                                                    }
                                                    break;
                                                }
                                            }
                                            if(!where.args[j].hasOwnProperty('alias') && !where.args[j].hasOwnProperty('index')) {
                                                s.extras = s.extras || [];
                                                s.extras.push(s.columns.length);
                                                var extra = {name: where.args[j].name, type: 'column'};
                                                // Index or name into selected columns
                                                if(s.columns[0].alias) {
                                                    extra.alias = where.args[j].name;
                                                    where.args[j].alias = extra.alias;
                                                }
                                                else {
                                                    where.args[j].index = s.columns.length;
                                                }
                                                extra.for = 'udf';
                                                s.columns.push(extra);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        s = splitJoins(s);
                        delete s.id;
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2], result0[6], result0[8], result0[10], result0[12], result0[14], result0[16], result0[18]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }