function parse_httpVerb() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 2) === "on") {
                    result0 = "on";
                    advance(pos, 2);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"on\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_Type();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_VerbName();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_QuotedWord();
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = parse_WithAliases();
                                                result8 = result8 !== null ? result8 : "";
                                                if (result8 !== null) {
                                                    result9 = parse_UsingHeaders();
                                                    result9 = result9 !== null ? result9 : "";
                                                    if (result9 !== null) {
                                                        result10 = parse_UsingDefaults();
                                                        result10 = result10 !== null ? result10 : "";
                                                        if (result10 !== null) {
                                                            result11 = parse_UsingMonkeyPatch();
                                                            result11 = result11 !== null ? result11 : "";
                                                            if (result11 !== null) {
                                                                result12 = parse_insig();
                                                                if (result12 !== null) {
                                                                    result13 = parse_UsingBodyTemplate();
                                                                    result13 = result13 !== null ? result13 : "";
                                                                    if (result13 !== null) {
                                                                        result14 = parse_insig();
                                                                        if (result14 !== null) {
                                                                            result15 = parse_AuthenticateUsing();
                                                                            result15 = result15 !== null ? result15 : "";
                                                                            if (result15 !== null) {
                                                                                result16 = parse_insig();
                                                                                if (result16 !== null) {
                                                                                    result17 = parse_ResultSet();
                                                                                    result17 = result17 !== null ? result17 : "";
                                                                                    if (result17 !== null) {
                                                                                        result18 = parse_insig();
                                                                                        if (result18 !== null) {
                                                                                            result19 = parse_Expires();
                                                                                            result19 = result19 !== null ? result19 : "";
                                                                                            if (result19 !== null) {
                                                                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19];
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
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, t, m, u, a, h, d, p, b, auth, r, exp) {
                        var ret = {
                            type: t,
                            method: m,
                            uri: u.value,
                            aliases: a || {},
                            headers: h || {},
                            defaults: d || {},
                            body: b,
                            resultSet: r || '',
                            cache: exp || {}
                        };
                        if(auth && auth.length > 0) {
                            ret.auth = auth;
                        }
                        if(p) ret.patch = p;
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[4], result0[6], result0[8], result0[9], result0[10], result0[11], result0[13], result0[15], result0[17], result0[19]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }