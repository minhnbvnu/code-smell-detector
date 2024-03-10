function renderElement(request, task, type, props, ref) {
              if (typeof type === "function") {
                if (shouldConstruct$1(type)) {
                  renderClassComponent(request, task, type, props);
                  return;
                } else {
                  renderIndeterminateComponent(request, task, type, props);
                  return;
                }
              }
              if (typeof type === "string") {
                renderHostElement(request, task, type, props);
                return;
              }
              switch (type) {
                case REACT_LEGACY_HIDDEN_TYPE:
                case REACT_DEBUG_TRACING_MODE_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_FRAGMENT_TYPE: {
                  renderNodeDestructive(request, task, props.children);
                  return;
                }
                case REACT_SUSPENSE_LIST_TYPE: {
                  pushBuiltInComponentStackInDEV(task, "SuspenseList");
                  renderNodeDestructive(request, task, props.children);
                  popComponentStackInDEV(task);
                  return;
                }
                case REACT_SCOPE_TYPE: {
                  throw new Error("ReactDOMServer does not yet support scope components.");
                }
                case REACT_SUSPENSE_TYPE: {
                  {
                    renderSuspenseBoundary(request, task, props);
                  }
                  return;
                }
              }
              if (typeof type === "object" && type !== null) {
                switch (type.$$typeof) {
                  case REACT_FORWARD_REF_TYPE: {
                    renderForwardRef(request, task, type, props, ref);
                    return;
                  }
                  case REACT_MEMO_TYPE: {
                    renderMemo(request, task, type, props, ref);
                    return;
                  }
                  case REACT_PROVIDER_TYPE: {
                    renderContextProvider(request, task, type, props);
                    return;
                  }
                  case REACT_CONTEXT_TYPE: {
                    renderContextConsumer(request, task, type, props);
                    return;
                  }
                  case REACT_LAZY_TYPE: {
                    renderLazyComponent(request, task, type, props);
                    return;
                  }
                }
              }
              var info = "";
              {
                if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                  info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
            }