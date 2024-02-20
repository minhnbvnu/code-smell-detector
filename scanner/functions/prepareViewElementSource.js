function prepareViewElementSource(id) {
    const fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn(`Could not find Fiber with id "${id}"`);
      return;
    }

    const {
      elementType,
      tag,
      type
    } = fiber;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IndeterminateComponent:
      case FunctionComponent:
        global.$type = type;
        break;

      case ForwardRef:
        global.$type = type.render;
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$type = elementType != null && elementType.type != null ? elementType.type : type;
        break;

      default:
        global.$type = null;
        break;
    }
  }