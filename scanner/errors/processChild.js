function processChild(element2, Component2) {
              var isClass = shouldConstruct$1(Component2);
              var publicContext = processContext(Component2, context, threadID, isClass);
              var queue = [];
              var replace = false;
              var updater = {
                isMounted: function(publicInstance) {
                  return false;
                },
                enqueueForceUpdate: function(publicInstance) {
                  if (queue === null) {
                    warnNoop(publicInstance, "forceUpdate");
                    return null;
                  }
                },
                enqueueReplaceState: function(publicInstance, completeState) {
                  replace = true;
                  queue = [completeState];
                },
                enqueueSetState: function(publicInstance, currentPartialState) {
                  if (queue === null) {
                    warnNoop(publicInstance, "setState");
                    return null;
                  }
                  queue.push(currentPartialState);
                }
              };
              var inst;
              if (isClass) {
                inst = new Component2(element2.props, publicContext, updater);
                if (typeof Component2.getDerivedStateFromProps === "function") {
                  {
                    if (inst.state === null || inst.state === void 0) {
                      var componentName = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutUninitializedState[componentName]) {
                        error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName);
                        didWarnAboutUninitializedState[componentName] = true;
                      }
                    }
                  }
                  var partialState = Component2.getDerivedStateFromProps.call(null, element2.props, inst.state);
                  {
                    if (partialState === void 0) {
                      var _componentName = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutUndefinedDerivedState[_componentName]) {
                        error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName);
                        didWarnAboutUndefinedDerivedState[_componentName] = true;
                      }
                    }
                  }
                  if (partialState != null) {
                    inst.state = _assign({}, inst.state, partialState);
                  }
                }
              } else {
                {
                  if (Component2.prototype && typeof Component2.prototype.render === "function") {
                    var _componentName2 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutBadClass[_componentName2]) {
                      error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2);
                      didWarnAboutBadClass[_componentName2] = true;
                    }
                  }
                }
                var componentIdentity = {};
                prepareToUseHooks(componentIdentity);
                inst = Component2(element2.props, publicContext, updater);
                inst = finishHooks(Component2, element2.props, inst, publicContext);
                {
                  if (inst != null && inst.render != null) {
                    var _componentName3 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutModulePatternComponent[_componentName3]) {
                      error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3);
                      didWarnAboutModulePatternComponent[_componentName3] = true;
                    }
                  }
                }
                if (inst == null || inst.render == null) {
                  child = inst;
                  validateRenderResult(child, Component2);
                  return;
                }
              }
              inst.props = element2.props;
              inst.context = publicContext;
              inst.updater = updater;
              var initialState = inst.state;
              if (initialState === void 0) {
                inst.state = initialState = null;
              }
              if (typeof inst.UNSAFE_componentWillMount === "function" || typeof inst.componentWillMount === "function") {
                if (typeof inst.componentWillMount === "function") {
                  {
                    if (inst.componentWillMount.__suppressDeprecationWarning !== true) {
                      var _componentName4 = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
                        warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", _componentName4);
                        didWarnAboutDeprecatedWillMount[_componentName4] = true;
                      }
                    }
                  }
                  if (typeof Component2.getDerivedStateFromProps !== "function") {
                    inst.componentWillMount();
                  }
                }
                if (typeof inst.UNSAFE_componentWillMount === "function" && typeof Component2.getDerivedStateFromProps !== "function") {
                  inst.UNSAFE_componentWillMount();
                }
                if (queue.length) {
                  var oldQueue = queue;
                  var oldReplace = replace;
                  queue = null;
                  replace = false;
                  if (oldReplace && oldQueue.length === 1) {
                    inst.state = oldQueue[0];
                  } else {
                    var nextState = oldReplace ? oldQueue[0] : inst.state;
                    var dontMutate = true;
                    for (var i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                      var partial = oldQueue[i2];
                      var _partialState = typeof partial === "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                      if (_partialState != null) {
                        if (dontMutate) {
                          dontMutate = false;
                          nextState = _assign({}, nextState, _partialState);
                        } else {
                          _assign(nextState, _partialState);
                        }
                      }
                    }
                    inst.state = nextState;
                  }
                } else {
                  queue = null;
                }
              }
              child = inst.render();
              {
                if (child === void 0 && inst.render._isMockFunction) {
                  child = null;
                }
              }
              validateRenderResult(child, Component2);
              var childContext;
              {
                if (typeof inst.getChildContext === "function") {
                  var _childContextTypes = Component2.childContextTypes;
                  if (typeof _childContextTypes === "object") {
                    childContext = inst.getChildContext();
                    for (var contextKey in childContext) {
                      if (!(contextKey in _childContextTypes)) {
                        {
                          throw Error((getComponentName(Component2) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                        }
                      }
                    }
                  } else {
                    {
                      error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component2) || "Unknown");
                    }
                  }
                }
                if (childContext) {
                  context = _assign({}, context, childContext);
                }
              }
            }