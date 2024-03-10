function parse_TryClause() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 3) === "try") {
                    result0 = "try";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"try\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.charCodeAt(pos.offset) === 123) {
                            result2 = "{";
                            advance(pos, 1);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"{\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result5 = parse_TryCrlf();
                                if (result5 !== null) {
                                    result4 = [];
                                    while (result5 !== null) {
                                        result4.push(result5);
                                        result5 = parse_TryCrlf();
                                    }
                                } else {
                                    result4 = null;
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        if (input.charCodeAt(pos.offset) === 125) {
                                            result6 = "}";
                                            advance(pos, 1);
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"}\"");
                                            }
                                        }
                                        if (result6 !== null) {
                                            result8 = parse_CatchClause();
                                            if (result8 !== null) {
                                                result7 = [];
                                                while (result8 !== null) {
                                                    result7.push(result8);
                                                    result8 = parse_CatchClause();
                                                }
                                            } else {
                                                result7 = null;
                                            }
                                            if (result7 !== null) {
                                                result8 = parse_FinallyClause();
                                                result8 = result8 !== null ? result8 : "";
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
                    result0 = (function(offset, line, column, tryClause, catchClause, finallyClause) {
                        var errMap = findThrows(tryClause);
                        for (var i = 0; i < catchClause.length; i++){
                            var catchvars = countLogicVars(catchClause[i].condition);
                            for (var j = 0; j < catchvars.length; j++){
                                var errVar = catchvars[j];
                                if(errMap.indexOf(errVar) == -1){
                                    throw new this.SyntaxError("Line " + line + " exception variable "+errVar+" is not thrown inside the try statement.");
                                }
                            }
                        }
                        var catchConds = [];
                        for(var i = 0; i < catchClause.length; i++){
                            catchConds.push(catchClause[i].condition);
                        }
                        return {
                            id : id++,
                            line : line,
                            type : 'try',
                            dependsOn : tryClause.concat(catchConds),
                            catchClause : catchClause,
                            finallyClause : finallyClause || undefined,
                            lock : false
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[4], result0[7], result0[8]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }