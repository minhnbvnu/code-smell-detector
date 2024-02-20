function xmlToken(stream, state, cx) {
      if (cx.depth == 2) { // Inside a JS /* */ comment
        if (stream.match(/^.*?\*\//)) { cx.depth = 1; }
        else { stream.skipToEnd(); }
        return "comment"
      }

      if (stream.peek() == "{") {
        xmlMode.skipAttribute(cx.state);

        var indent = flatXMLIndent(cx.state), xmlContext = cx.state.context;
        // If JS starts on same line as tag
        if (xmlContext && stream.match(/^[^>]*>\s*$/, false)) {
          while (xmlContext.prev && !xmlContext.startOfLine)
            { xmlContext = xmlContext.prev; }
          // If tag starts the line, use XML indentation level
          if (xmlContext.startOfLine) { indent -= config.indentUnit; }
          // Else use JS indentation level
          else if (cx.prev.state.lexical) { indent = cx.prev.state.lexical.indented; }
        // Else if inside of tag
        } else if (cx.depth == 1) {
          indent += config.indentUnit;
        }

        state.context = new Context(CodeMirror.startState(jsMode, indent),
                                    jsMode, 0, state.context);
        return null
      }

      if (cx.depth == 1) { // Inside of tag
        if (stream.peek() == "<") { // Tag inside of tag
          xmlMode.skipAttribute(cx.state);
          state.context = new Context(CodeMirror.startState(xmlMode, flatXMLIndent(cx.state)),
                                      xmlMode, 0, state.context);
          return null
        } else if (stream.match("//")) {
          stream.skipToEnd();
          return "comment"
        } else if (stream.match("/*")) {
          cx.depth = 2;
          return token(stream, state)
        }
      }

      var style = xmlMode.token(stream, cx.state), cur = stream.current(), stop;
      if (/\btag\b/.test(style)) {
        if (/>$/.test(cur)) {
          if (cx.state.context) { cx.depth = 0; }
          else { state.context = state.context.prev; }
        } else if (/^</.test(cur)) {
          cx.depth = 1;
        }
      } else if (!style && (stop = cur.indexOf("{")) > -1) {
        stream.backUp(cur.length - stop);
      }
      return style
    }