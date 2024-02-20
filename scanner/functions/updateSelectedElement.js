function updateSelectedElement(inspectedElement) {
    const {
      hooks,
      id,
      props
    } = inspectedElement;
    const fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn(`Could not find Fiber with id "${id}"`);
      return;
    }

    const {
      elementType,
      stateNode,
      tag,
      type
    } = fiber;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IndeterminateComponent:
        global.$r = stateNode;
        break;

      case FunctionComponent:
        global.$r = {
          hooks,
          props,
          type
        };
        break;

      case ForwardRef:
        global.$r = {
          hooks,
          props,
          type: type.render
        };
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$r = {
          hooks,
          props,
          type: elementType != null && elementType.type != null ? elementType.type : type
        };
        break;

      default:
        global.$r = null;
        break;
    }
  }