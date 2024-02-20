function classbody(c) {
    var name;
    var isStatic;
    var isGenerator;
    var getset;
    var props = Object.create(null);
    var staticProps = Object.create(null);
    var computed;
    for (var i = 0; state.tokens.next.id !== "}"; ++i) {
      name = state.tokens.next;
      isStatic = false;
      isGenerator = false;
      getset = null;
      if (name.id === ";") {
        warning("W032");
        advance(";");
        continue;
      }

      if (name.id === "*") {
        isGenerator = true;
        advance("*");
        name = state.tokens.next;
      }
      if (name.id === "[") {
        name = computedPropertyName();
        computed = true;
      } else if (isPropertyName(name)) {
        advance();
        computed = false;
        if (name.identifier && name.value === "static") {
          if (checkPunctuator(state.tokens.next, "*")) {
            isGenerator = true;
            advance("*");
          }
          if (isPropertyName(state.tokens.next) || state.tokens.next.id === "[") {
            computed = state.tokens.next.id === "[";
            isStatic = true;
            name = state.tokens.next;
            if (state.tokens.next.id === "[") {
              name = computedPropertyName();
            } else advance();
          }
        }

        if (name.identifier && (name.value === "get" || name.value === "set")) {
          if (isPropertyName(state.tokens.next) || state.tokens.next.id === "[") {
            computed = state.tokens.next.id === "[";
            getset = name;
            name = state.tokens.next;
            if (state.tokens.next.id === "[") {
              name = computedPropertyName();
            } else advance();
          }
        }
      } else {
        warning("W052", state.tokens.next, state.tokens.next.value || state.tokens.next.type);
        advance();
        continue;
      }

      if (!checkPunctuator(state.tokens.next, "(")) {
        error("E054", state.tokens.next, state.tokens.next.value);
        while (state.tokens.next.id !== "}" &&
               !checkPunctuator(state.tokens.next, "(")) {
          advance();
        }
        if (state.tokens.next.value !== "(") {
          doFunction({ statement: c });
        }
      }

      if (!computed) {
        if (getset) {
          saveAccessor(
            getset.value, isStatic ? staticProps : props, name.value, name, true, isStatic);
        } else {
          if (name.value === "constructor") {
            state.nameStack.set(c);
          } else {
            state.nameStack.set(name);
          }
          saveProperty(isStatic ? staticProps : props, name.value, name, true, isStatic);
        }
      }

      if (getset && name.value === "constructor") {
        var propDesc = getset.value === "get" ? "class getter method" : "class setter method";
        error("E049", name, propDesc, "constructor");
      } else if (name.value === "prototype") {
        error("E049", name, "class method", "prototype");
      }

      propertyName(name);

      doFunction({
        statement: c,
        type: isGenerator ? "generator" : null,
        classExprBinding: c.namedExpr ? c.name : null
      });
    }

    checkProperties(props);
  }