function renderIndeterminateComponent(request, task, Component, props) {
              var legacyContext;
              {
                legacyContext = getMaskedContext(Component, task.legacyContext);
              }
              pushFunctionComponentStackInDEV(task, Component);
              {
                if (Component.prototype && typeof Component.prototype.render === "function") {
                  var componentName = getComponentNameFromType(Component) || "Unknown";
                  if (!didWarnAboutBadClass[componentName]) {
                    error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                    didWarnAboutBadClass[componentName] = true;
                  }
                }
              }
              var value = renderWithHooks(request, task, Component, props, legacyContext);
              var hasId = checkDidRenderIdHook();
              {
                if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                  var _componentName = getComponentNameFromType(Component) || "Unknown";
                  if (!didWarnAboutModulePatternComponent[_componentName]) {
                    error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                    didWarnAboutModulePatternComponent[_componentName] = true;
                  }
                }
              }
              if (
                // Run these checks in production only if the flag is off.
                // Eventually we'll delete this branch altogether.
                typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0
              ) {
                {
                  var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                  if (!didWarnAboutModulePatternComponent[_componentName2]) {
                    error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                    didWarnAboutModulePatternComponent[_componentName2] = true;
                  }
                }
                mountClassInstance(value, Component, props, legacyContext);
                finishClassComponent(request, task, value, Component, props);
              } else {
                {
                  validateFunctionComponentInDev(Component);
                }
                if (hasId) {
                  var prevTreeContext = task.treeContext;
                  var totalChildren = 1;
                  var index = 0;
                  task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
                  try {
                    renderNodeDestructive(request, task, value);
                  } finally {
                    task.treeContext = prevTreeContext;
                  }
                } else {
                  renderNodeDestructive(request, task, value);
                }
              }
              popComponentStackInDEV(task);
            }