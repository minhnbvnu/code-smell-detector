function get_directive_type(name2) {
    if (name2 === "use")
      return "Action";
    if (name2 === "animate")
      return "Animation";
    if (name2 === "bind")
      return "Binding";
    if (name2 === "class")
      return "Class";
    if (name2 === "style")
      return "StyleDirective";
    if (name2 === "on")
      return "EventHandler";
    if (name2 === "let")
      return "Let";
    if (name2 === "ref")
      return "Ref";
    if (name2 === "in" || name2 === "out" || name2 === "transition")
      return "Transition";
  }