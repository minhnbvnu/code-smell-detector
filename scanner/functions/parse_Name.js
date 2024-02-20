function parse_Name() {
                var result0, result1, result2, result3;
                var pos0, pos1, pos2;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Word();
                if (result0 !== null) {
                    result1 = [];
                    pos2 = clone(pos);
                    if (input.charCodeAt(pos.offset) === 46) {
                        result2 = ".";
                        advance(pos, 1);
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_Word();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = clone(pos2);
                        }
                    } else {
                        result2 = null;
                        pos = clone(pos2);
                    }
                    while (result2 !== null) {
                        result1.push(result2);
                        pos2 = clone(pos);
                        if (input.charCodeAt(pos.offset) === 46) {
                            result2 = ".";
                            advance(pos, 1);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\".\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_Word();
                            if (result3 !== null) {
                                result2 = [result2, result3];
                            } else {
                                result2 = null;
                                pos = clone(pos2);
                            }
                        } else {
                            result2 = null;
                            pos = clone(pos2);
                        }
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, obj) {
                        return append(obj);
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }