function getInstanceAndStyle(id) {
    let instance = null;
    let style = null;
    const fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      instance = fiber.stateNode;

      if (fiber.memoizedProps !== null) {
        style = fiber.memoizedProps.style;
      }
    }

    return {
      instance,
      style
    };
  }