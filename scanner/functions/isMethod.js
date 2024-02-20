function isMethod() {
    return state.funct["(statement)"] && state.funct["(statement)"].type === "class" ||
           state.funct["(context)"] && state.funct["(context)"]["(verb)"] === "class";
  }