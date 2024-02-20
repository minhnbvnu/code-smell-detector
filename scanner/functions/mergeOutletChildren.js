function mergeOutletChildren(controller, outlets, components) {
    let merged = [];

    for (let outlet of outlets) {
      if (controller) {
        let parentComponent = findOutletComponentParent(outlet.children);

        if (controllerForComponent(parentComponent) === controller) {
          let parentNode = findOutletComponentNode(components, parentComponent);

          if (parentNode) {
            parentNode.children.unshift(outlet);
            continue;
          }
        }
      }

      merged.push(outlet);
    }

    merged.push(...components);

    return merged;
  }