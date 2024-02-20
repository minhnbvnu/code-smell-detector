function deletePath(type, id, hookID, path) {
    const fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      const instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          path = path.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (path.length === 0) {// Simple context value (noop)
              } else {
                Object(utils["c" /* deletePathInObject */])(instance.context, path);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookStateDeletePath === 'function') {
            overrideHookStateDeletePath(fiber, hookID, path);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsDeletePath === 'function') {
              overridePropsDeletePath(fiber, path);
            }
          } else {
            fiber.pendingProps = Object(backend_utils["c" /* copyWithDelete */])(instance.props, path);
            instance.forceUpdate();
          }

          break;

        case 'state':
          Object(utils["c" /* deletePathInObject */])(instance.state, path);
          instance.forceUpdate();
          break;
      }
    }
  }