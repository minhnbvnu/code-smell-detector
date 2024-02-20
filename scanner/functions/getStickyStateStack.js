function getStickyStateStack(state) {
        var stack = [];
        if (!state) return stack;
        do {
          if (state.sticky) stack.push(state);
          state = state.parent;
        } while (state);
        stack.reverse();
        return stack;
      }