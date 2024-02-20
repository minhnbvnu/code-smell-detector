function remove_global_pseudo_class(selector) {
        const first = selector.children[0];
        const last = selector.children[selector.children.length - 1];
        code.remove(selector.start, first.start).remove(last.end, selector.end);
      }