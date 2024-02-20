function parse_basevalue() {
        var result0, result1;
        var pos0, pos1;
        
        result0 = parse_LocaleCall();
        if (result0 === null) {
          result0 = parse_TiConstant();
          if (result0 === null) {
            result0 = parse_WPATH();
            if (result0 === null) {
              result0 = parse_string();
              if (result0 === null) {
                result0 = parse_number();
                if (result0 === null) {
                  result0 = parse_object();
                  if (result0 === null) {
                    result0 = parse_array();
                    if (result0 === null) {
                      pos0 = pos;
                      pos1 = pos;
                      if (input.substr(pos, 4) === "true") {
                        result0 = "true";
                        pos += 4;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"true\"");
                        }
                      }
                      if (result0 !== null) {
                        result1 = parse___();
                        if (result1 !== null) {
                          result0 = [result0, result1];
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                      if (result0 !== null) {
                        result0 = (function(offset) { return true;   })(pos0);
                      }
                      if (result0 === null) {
                        pos = pos0;
                      }
                      if (result0 === null) {
                        pos0 = pos;
                        pos1 = pos;
                        if (input.substr(pos, 5) === "false") {
                          result0 = "false";
                          pos += 5;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"false\"");
                          }
                        }
                        if (result0 !== null) {
                          result1 = parse___();
                          if (result1 !== null) {
                            result0 = [result0, result1];
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                        if (result0 !== null) {
                          result0 = (function(offset) { return false;  })(pos0);
                        }
                        if (result0 === null) {
                          pos = pos0;
                        }
                        if (result0 === null) {
                          pos0 = pos;
                          pos1 = pos;
                          if (input.substr(pos, 9) === "undefined") {
                            result0 = "undefined";
                            pos += 9;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"undefined\"");
                            }
                          }
                          if (result0 !== null) {
                            result1 = parse___();
                            if (result1 !== null) {
                              result0 = [result0, result1];
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                          if (result0 !== null) {
                            result0 = (function(offset) { return ALLOY_EXPR + "undefined"; })(pos0);
                          }
                          if (result0 === null) {
                            pos = pos0;
                          }
                          if (result0 === null) {
                            pos0 = pos;
                            pos1 = pos;
                            if (input.substr(pos, 4) === "null") {
                              result0 = "null";
                              pos += 4;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"null\"");
                              }
                            }
                            if (result0 !== null) {
                              result1 = parse___();
                              if (result1 !== null) {
                                result0 = [result0, result1];
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                            if (result0 !== null) {
                              result0 = (function(offset) { return ALLOY_EXPR + "null"; })(pos0);
                            }
                            if (result0 === null) {
                              pos = pos0;
                            }
                            if (result0 === null) {
                              result0 = parse_DollarArgs();
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
        }
        return result0;
      }