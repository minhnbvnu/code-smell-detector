function parse_generalVerb() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19, result20, result21, result22, result23, result24;
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
                                if (input.substr(pos.offset, 2) === "do") {
                                    result4 = "do";
                                    advance(pos, 2);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"do\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_Word();
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                if (input.substr(pos.offset, 2) === "at") {
                                                    result8 = "at";
                                                    advance(pos, 2);
                                                } else {
                                                    result8 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"at\"");
                                                    }
                                                }
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_QuotedWord();
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                result12 = parse_WithAliases();
                                                                result12 = result12 !== null ? result12 : "";
                                                                if (result12 !== null) {
                                                                    result13 = parse_UsingHeaders();
                                                                    result13 = result13 !== null ? result13 : "";
                                                                    if (result13 !== null) {
                                                                        result14 = parse_Expect();
                                                                        result14 = result14 !== null ? result14 : "";
                                                                        if (result14 !== null) {
                                                                            result15 = parse_UsingDefaults();
                                                                            result15 = result15 !== null ? result15 : "";
                                                                            if (result15 !== null) {
                                                                                result16 = parse_UsingMonkeyPatch();
                                                                                result16 = result16 !== null ? result16 : "";
                                                                                if (result16 !== null) {
                                                                                    result17 = parse_insig();
                                                                                    if (result17 !== null) {
                                                                                        result18 = parse_UsingBodyTemplate();
                                                                                        result18 = result18 !== null ? result18 : "";
                                                                                        if (result18 !== null) {
                                                                                            result19 = parse_insig();
                                                                                            if (result19 !== null) {
                                                                                                result20 = parse_AuthenticateUsing();
                                                                                                result20 = result20 !== null ? result20 : "";
                                                                                                if (result20 !== null) {
                                                                                                    result21 = parse_insig();
                                                                                                    if (result21 !== null) {
                                                                                                        result22 = parse_ResultSet();
                                                                                                        result22 = result22 !== null ? result22 : "";
                                                                                                        if (result22 !== null) {
                                                                                                            result23 = parse_insig();
                                                                                                            if (result23 !== null) {
                                                                                                                result24 = parse_Expires();
                                                                                                                result24 = result24 !== null ? result24 : "";
                                                                                                                if (result24 !== null) {
                                                                                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19, result20, result21, result22, result23, result24];
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
                    result0 = (function(offset, line, column, t, m, u, a, h, e, d, p, b, auth, r, exp) {
                        var ret = {
                            type: t,
                            method: m,
                            uri: u.value,
                            aliases: a || {},
                            headers: h || {},
                            expect: e || {},
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
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[6], result0[10], result0[12], result0[13], result0[14], result0[15], result0[16], result0[18], result0[20], result0[22], result0[24]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }