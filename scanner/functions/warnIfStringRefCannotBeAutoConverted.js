function warnIfStringRefCannotBeAutoConverted(config) {
              {
                if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                  var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                  if (!didWarnAboutStringRefs[componentName]) {
                    error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                    didWarnAboutStringRefs[componentName] = true;
                  }
                }
              }
            }