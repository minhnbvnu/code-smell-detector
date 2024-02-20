function propertyName(preserveOrToken) {
    var id;
    var preserve = true;
    if (typeof preserveOrToken === "object") {
      id = preserveOrToken;
    } else {
      preserve = preserveOrToken;
      id = optionalidentifier(false, true, preserve);
    }

    if (!id) {
      if (state.tokens.next.id === "(string)") {
        id = state.tokens.next.value;
        if (!preserve) {
          advance();
        }
      } else if (state.tokens.next.id === "(number)") {
        id = state.tokens.next.value.toString();
        if (!preserve) {
          advance();
        }
      }
    } else if (typeof id === "object") {
      if (id.id === "(string)" || id.id === "(identifier)") id = id.value;
      else if (id.id === "(number)") id = id.value.toString();
    }

    if (id === "hasOwnProperty") {
      warning("W001");
    }

    return id;
  }