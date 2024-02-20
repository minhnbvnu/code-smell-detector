function warnNoop(publicInstance, callerName) {
              {
                var _constructor = publicInstance.constructor;
                var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
                var warningKey = componentName + "." + callerName;
                if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                  return;
                }
                error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
                didWarnAboutNoopUpdateForComponent[warningKey] = true;
              }
            }