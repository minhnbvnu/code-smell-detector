function draggable(children) {
    return React.createElement(
      SourceTargetDraggableRow,
      {
        _parent,
        ...children
      }
    );
  }