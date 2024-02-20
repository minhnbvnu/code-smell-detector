function parse_PTokenChar() {
        var result0;

        if (input.charCodeAt(pos) === 33) {
          result0 = "!";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"!\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 35) {
            result0 = "#";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"#\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 36) {
              result0 = "$";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"$\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 37) {
                result0 = "%";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"%\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 38) {
                  result0 = "&";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"&\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 39) {
                    result0 = "'";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"'\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 40) {
                      result0 = "(";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"(\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 41) {
                        result0 = ")";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\")\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 42) {
                          result0 = "*";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"*\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.charCodeAt(pos) === 43) {
                            result0 = "+";
                            pos++;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"+\"");
                            }
                          }
                          if (result0 === null) {
                            if (input.charCodeAt(pos) === 45) {
                              result0 = "-";
                              pos++;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"-\"");
                              }
                            }
                            if (result0 === null) {
                              if (input.charCodeAt(pos) === 46) {
                                result0 = ".";
                                pos++;
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\".\"");
                                }
                              }
                              if (result0 === null) {
                                if (input.charCodeAt(pos) === 124) {
                                  result0 = "|";
                                  pos++;
                                } else {
                                  result0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"|\"");
                                  }
                                }
                                if (result0 === null) {
                                  result0 = parse_Digit();
                                  if (result0 === null) {
                                    if (input.charCodeAt(pos) === 58) {
                                      result0 = ":";
                                      pos++;
                                    } else {
                                      result0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                      }
                                    }
                                    if (result0 === null) {
                                      if (input.charCodeAt(pos) === 60) {
                                        result0 = "<";
                                        pos++;
                                      } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"<\"");
                                        }
                                      }
                                      if (result0 === null) {
                                        if (input.charCodeAt(pos) === 61) {
                                          result0 = "=";
                                          pos++;
                                        } else {
                                          result0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"=\"");
                                          }
                                        }
                                        if (result0 === null) {
                                          if (input.charCodeAt(pos) === 62) {
                                            result0 = ">";
                                            pos++;
                                          } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\">\"");
                                            }
                                          }
                                          if (result0 === null) {
                                            if (input.charCodeAt(pos) === 63) {
                                              result0 = "?";
                                              pos++;
                                            } else {
                                              result0 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"?\"");
                                              }
                                            }
                                            if (result0 === null) {
                                              if (input.charCodeAt(pos) === 64) {
                                                result0 = "@";
                                                pos++;
                                              } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"@\"");
                                                }
                                              }
                                              if (result0 === null) {
                                                result0 = parse_Alpha();
                                                if (result0 === null) {
                                                  if (input.charCodeAt(pos) === 91) {
                                                    result0 = "[";
                                                    pos++;
                                                  } else {
                                                    result0 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"[\"");
                                                    }
                                                  }
                                                  if (result0 === null) {
                                                    if (input.charCodeAt(pos) === 93) {
                                                      result0 = "]";
                                                      pos++;
                                                    } else {
                                                      result0 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"]\"");
                                                      }
                                                    }
                                                    if (result0 === null) {
                                                      if (input.charCodeAt(pos) === 94) {
                                                        result0 = "^";
                                                        pos++;
                                                      } else {
                                                        result0 = null;
                                                        if (reportFailures === 0) {
                                                          matchFailed("\"^\"");
                                                        }
                                                      }
                                                      if (result0 === null) {
                                                        if (input.charCodeAt(pos) === 95) {
                                                          result0 = "_";
                                                          pos++;
                                                        } else {
                                                          result0 = null;
                                                          if (reportFailures === 0) {
                                                            matchFailed("\"_\"");
                                                          }
                                                        }
                                                        if (result0 === null) {
                                                          if (input.charCodeAt(pos) === 96) {
                                                            result0 = "`";
                                                            pos++;
                                                          } else {
                                                            result0 = null;
                                                            if (reportFailures === 0) {
                                                              matchFailed("\"`\"");
                                                            }
                                                          }
                                                          if (result0 === null) {
                                                            if (input.charCodeAt(pos) === 123) {
                                                              result0 = "{";
                                                              pos++;
                                                            } else {
                                                              result0 = null;
                                                              if (reportFailures === 0) {
                                                                matchFailed("\"{\"");
                                                              }
                                                            }
                                                            if (result0 === null) {
                                                              if (/^[\/\/]/.test(input.charAt(pos))) {
                                                                result0 = input.charAt(pos);
                                                                pos++;
                                                              } else {
                                                                result0 = null;
                                                                if (reportFailures === 0) {
                                                                  matchFailed("[\\/\\/]");
                                                                }
                                                              }
                                                              if (result0 === null) {
                                                                if (input.charCodeAt(pos) === 125) {
                                                                  result0 = "}";
                                                                  pos++;
                                                                } else {
                                                                  result0 = null;
                                                                  if (reportFailures === 0) {
                                                                    matchFailed("\"}\"");
                                                                  }
                                                                }
                                                                if (result0 === null) {
                                                                  if (input.charCodeAt(pos) === 126) {
                                                                    result0 = "~";
                                                                    pos++;
                                                                  } else {
                                                                    result0 = null;
                                                                    if (reportFailures === 0) {
                                                                      matchFailed("\"~\"");
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