function _update(comp, data) {
      if (comp instanceof Component.Container) {
        comp._render(data);
      } else {
        // TODO: we probably need to propagate updates for attr, style, handlers, too
        comp.setProps(data.props);
      }
    }