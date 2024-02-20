function renderLazyComponent(request, task, lazyComponent, props, ref) {
              pushBuiltInComponentStackInDEV(task, "Lazy");
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              var Component = init(payload);
              var resolvedProps = resolveDefaultProps(Component, props);
              renderElement(request, task, Component, resolvedProps, ref);
              popComponentStackInDEV(task);
            }