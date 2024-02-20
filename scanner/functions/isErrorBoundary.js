function isErrorBoundary(fiber) {
    const {
      tag,
      type
    } = fiber;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        const instance = fiber.stateNode;
        return typeof type.getDerivedStateFromError === 'function' || instance !== null && typeof instance.componentDidCatch === 'function';

      default:
        return false;
    }
  }