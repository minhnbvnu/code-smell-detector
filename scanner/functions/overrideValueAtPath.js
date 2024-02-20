function overrideValueAtPath(type, id, hookID, path, value) {
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
              if (path.length === 0) {
                // Simple context value
                instance.context = value;
              } else {
                Object(utils["v" /* setInObject */])(instance.context, path, value);
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
          if (typeof overrideHookState === 'function') {
            overrideHookState(fiber, hookID, path, value);
          }

          break;

        case 'props':
          switch (fiber.tag) {
            case ClassComponent:
              fiber.pendingProps = Object(backend_utils["e" /* copyWithSet */])(instance.props, path, value);
              instance.forceUpdate();
              break;

            default:
              if (typeof overrideProps === 'function') {
                overrideProps(fiber, path, value);
              }

              break;
          }

          break;

        case 'state':
          switch (fiber.tag) {
            case ClassComponent:
              Object(utils["v" /* setInObject */])(instance.state, path, value);
              instance.forceUpdate();
              break;
          }

          break;
      }
    }
  }