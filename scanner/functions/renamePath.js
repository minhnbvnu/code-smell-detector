function renamePath(type, id, hookID, oldPath, newPath) {
    const fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      const instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          oldPath = oldPath.slice(1);
          newPath = newPath.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (oldPath.length === 0) {// Simple context value (noop)
              } else {
                Object(utils["t" /* renamePathInObject */])(instance.context, oldPath, newPath);
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
          if (typeof overrideHookStateRenamePath === 'function') {
            overrideHookStateRenamePath(fiber, hookID, oldPath, newPath);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsRenamePath === 'function') {
              overridePropsRenamePath(fiber, oldPath, newPath);
            }
          } else {
            fiber.pendingProps = Object(backend_utils["d" /* copyWithRename */])(instance.props, oldPath, newPath);
            instance.forceUpdate();
          }

          break;

        case 'state':
          Object(utils["t" /* renamePathInObject */])(instance.state, oldPath, newPath);
          instance.forceUpdate();
          break;
      }
    }
  }