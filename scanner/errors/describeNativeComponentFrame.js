function describeNativeComponentFrame(fn, construct) {
              if (!fn || reentry) {
                return "";
              }
              {
                var frame = componentFrameCache.get(fn);
                if (frame !== void 0) {
                  return frame;
                }
              }
              var control;
              reentry = true;
              var previousPrepareStackTrace = Error.prepareStackTrace;
              Error.prepareStackTrace = void 0;
              var previousDispatcher;
              {
                previousDispatcher = ReactCurrentDispatcher.current;
                ReactCurrentDispatcher.current = null;
                disableLogs();
              }
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  });
                  if (typeof Reflect === "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x) {
                      control = x;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x) {
                      control = x;
                    }
                    fn.call(Fake.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x) {
                    control = x;
                  }
                  fn();
                }
              } catch (sample) {
                if (sample && control && typeof sample.stack === "string") {
                  var sampleLines = sample.stack.split("\n");
                  var controlLines = control.stack.split("\n");
                  var s = sampleLines.length - 1;
                  var c = controlLines.length - 1;
                  while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                    c--;
                  }
                  for (; s >= 1 && c >= 0; s--, c--) {
                    if (sampleLines[s] !== controlLines[c]) {
                      if (s !== 1 || c !== 1) {
                        do {
                          s--;
                          c--;
                          if (c < 0 || sampleLines[s] !== controlLines[c]) {
                            var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                            if (fn.displayName && _frame.includes("<anonymous>")) {
                              _frame = _frame.replace("<anonymous>", fn.displayName);
                            }
                            {
                              if (typeof fn === "function") {
                                componentFrameCache.set(fn, _frame);
                              }
                            }
                            return _frame;
                          }
                        } while (s >= 1 && c >= 0);
                      }
                      break;
                    }
                  }
                }
              } finally {
                reentry = false;
                {
                  ReactCurrentDispatcher.current = previousDispatcher;
                  reenableLogs();
                }
                Error.prepareStackTrace = previousPrepareStackTrace;
              }
              var name = fn ? fn.displayName || fn.name : "";
              var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
              {
                if (typeof fn === "function") {
                  componentFrameCache.set(fn, syntheticFrame);
                }
              }
              return syntheticFrame;
            }