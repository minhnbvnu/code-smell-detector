function get_invalidated(variable, node3) {
      if (main_execution_context && !variable.subscribable && variable.name[0] !== "$") {
        return node3;
      }
      return renderer_invalidate(renderer, variable.name, void 0, main_execution_context);
    }