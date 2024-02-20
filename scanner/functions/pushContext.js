function pushContext(state, stream, type, indent) {
      indent = indent >= 0 ? indent : indentUnit;
      state.context = new Context(type, stream.indentation() + indent, state.context);
      return type;
    }