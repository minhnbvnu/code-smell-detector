function parse_schar() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        if (/^[^'\\\0-\x1F]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[^'\\\\\\0-\\x1F]");
          }
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.substr(pos, 2) === "\\'") {
            result0 = "\\'";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\\'\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset) { return "'";  })(pos0);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            if (input.substr(pos, 2) === "\\\\") {
              result0 = "\\\\";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\\\\\\\"");
              }
            }
            if (result0 !== null) {
              result0 = (function(offset) { return "\\"; })(pos0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              if (input.substr(pos, 2) === "\\/") {
                result0 = "\\/";
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\\\/\"");
                }
              }
              if (result0 !== null) {
                result0 = (function(offset) { return "/";  })(pos0);
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                pos0 = pos;
                if (input.substr(pos, 2) === "\\b") {
                  result0 = "\\b";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\\b\"");
                  }
                }
                if (result0 !== null) {
                  result0 = (function(offset) { return "\b"; })(pos0);
                }
                if (result0 === null) {
                  pos = pos0;
                }
                if (result0 === null) {
                  pos0 = pos;
                  if (input.substr(pos, 2) === "\\f") {
                    result0 = "\\f";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"\\\\f\"");
                    }
                  }
                  if (result0 !== null) {
                    result0 = (function(offset) { return "\f"; })(pos0);
                  }
                  if (result0 === null) {
                    pos = pos0;
                  }
                  if (result0 === null) {
                    pos0 = pos;
                    if (input.substr(pos, 2) === "\\n") {
                      result0 = "\\n";
                      pos += 2;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"\\\\n\"");
                      }
                    }
                    if (result0 !== null) {
                      result0 = (function(offset) { return "\n"; })(pos0);
                    }
                    if (result0 === null) {
                      pos = pos0;
                    }
                    if (result0 === null) {
                      pos0 = pos;
                      if (input.substr(pos, 2) === "\\r") {
                        result0 = "\\r";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"\\\\r\"");
                        }
                      }
                      if (result0 !== null) {
                        result0 = (function(offset) { return "\r"; })(pos0);
                      }
                      if (result0 === null) {
                        pos = pos0;
                      }
                      if (result0 === null) {
                        pos0 = pos;
                        if (input.substr(pos, 2) === "\\t") {
                          result0 = "\\t";
                          pos += 2;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"\\\\t\"");
                          }
                        }
                        if (result0 !== null) {
                          result0 = (function(offset) { return "\t"; })(pos0);
                        }
                        if (result0 === null) {
                          pos = pos0;
                        }
                        if (result0 === null) {
                          pos0 = pos;
                          pos1 = pos;
                          if (input.substr(pos, 2) === "\\u") {
                            result0 = "\\u";
                            pos += 2;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"\\\\u\"");
                            }
                          }
                          if (result0 !== null) {
                            result1 = parse_hexDigit();
                            if (result1 !== null) {
                              result2 = parse_hexDigit();
                              if (result2 !== null) {
                                result3 = parse_hexDigit();
                                if (result3 !== null) {
                                  result4 = parse_hexDigit();
                                  if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                          if (result0 !== null) {
                            result0 = (function(offset, h1, h2, h3, h4) {
                                return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                              })(pos0, result0[1], result0[2], result0[3], result0[4]);
                          }
                          if (result0 === null) {
                            pos = pos0;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }