function jsToken(stream, state, cx) {
      if (stream.peek() == "<" && jsMode.expressionAllowed(stream, cx.state)) {
        jsMode.skipExpression(cx.state);
        state.context = new Context(CodeMirror.startState(xmlMode, jsMode.indent(cx.state, "")),
                                    xmlMode, 0, state.context);
        return null
      }

      var style = jsMode.token(stream, cx.state);
      if (!style && cx.depth != null) {
        var cur = stream.current();
        if (cur == "{") {
          cx.depth++;
        } else if (cur == "}") {
          if (--cx.depth == 0) { state.context = state.context.prev; }
        }
      }
      return style
    }