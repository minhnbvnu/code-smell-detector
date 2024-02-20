function checkLeftSideAssign(left, assignToken, options) {

    var allowDestructuring = options && options.allowDestructuring;

    assignToken = assignToken || left;

    if (state.option.freeze) {
      var nativeObject = findNativePrototype(left);
      if (nativeObject)
        warning("W121", left, nativeObject);
    }

    if (left.identifier && !left.isMetaProperty) {
      state.funct["(scope)"].block.reassign(left.value, left);
    }

    if (left.id === ".") {
      if (!left.left || left.left.value === "arguments" && !state.isStrict()) {
        warning("E031", assignToken);
      }

      state.nameStack.set(state.tokens.prev);
      return true;
    } else if (left.id === "{" || left.id === "[") {
      if (allowDestructuring && state.tokens.curr.left.destructAssign) {
        state.tokens.curr.left.destructAssign.forEach(function(t) {
          if (t.id) {
            state.funct["(scope)"].block.modify(t.id, t.token);
          }
        });
      } else {
        if (left.id === "{" || !left.left) {
          warning("E031", assignToken);
        } else if (left.left.value === "arguments" && !state.isStrict()) {
          warning("E031", assignToken);
        }
      }

      if (left.id === "[") {
        state.nameStack.set(left.right);
      }

      return true;
    } else if (left.isMetaProperty) {
      error("E031", assignToken);
      return true;
    } else if (left.identifier && !isReserved(left)) {
      if (state.funct["(scope)"].labeltype(left.value) === "exception") {
        warning("W022", left);
      }
      state.nameStack.set(left);
      return true;
    }

    if (left === state.syntax["function"]) {
      warning("W023", state.tokens.curr);
    }

    return false;
  }