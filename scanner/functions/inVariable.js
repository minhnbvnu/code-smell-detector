function inVariable (stream, state) {
      // Attempt to match a dot that precedes a property
      if (state.waitDot) {
        state.waitDot = false;

        if (stream.peek() != ".") {
          return "null";
        }

        // Dot followed by a non-word character should be considered an error.
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat(".")) {
          state.waitProperty = true;
          return "null";
        } else {
          throw Error ("Unexpected error while waiting for property.");
        }
      }

      // Attempt to match a pipe that precedes a filter
      if (state.waitPipe) {
        state.waitPipe = false;

        if (stream.peek() != "|") {
          return "null";
        }

        // Pipe followed by a non-word character should be considered an error.
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat("|")) {
          state.waitFilter = true;
          return "null";
        } else {
          throw Error ("Unexpected error while waiting for filter.");
        }
      }

      // Highlight properties
      if (state.waitProperty) {
        state.waitProperty = false;
        if (stream.match(/\b(\w+)\b/)) {
          state.waitDot = true;  // A property can be followed by another property
          state.waitPipe = true;  // A property can be followed by a filter
          return "property";
        }
      }

      // Highlight filters
      if (state.waitFilter) {
          state.waitFilter = false;
        if (stream.match(filters)) {
          return "variable-2";
        }
      }

      // Ignore all white spaces
      if (stream.eatSpace()) {
        state.waitProperty = false;
        return "null";
      }

      // Identify numbers
      if (stream.match(/\b\d+(\.\d+)?\b/)) {
        return "number";
      }

      // Identify strings
      if (stream.match("'")) {
        state.tokenize = inString("'", state.tokenize);
        return "string";
      } else if (stream.match('"')) {
        state.tokenize = inString('"', state.tokenize);
        return "string";
      }

      // Attempt to find the variable
      if (stream.match(/\b(\w+)\b/) && !state.foundVariable) {
        state.waitDot = true;
        state.waitPipe = true;  // A property can be followed by a filter
        return "variable";
      }

      // If found closing tag reset
      if (stream.match("}}")) {
        state.waitProperty = null;
        state.waitFilter = null;
        state.waitDot = null;
        state.waitPipe = null;
        state.tokenize = tokenBase;
        return "tag";
      }

      // If nothing was found, advance to the next character
      stream.next();
      return "null";
    }