function get_function_name(_node, parent) {
    if (parent.type === "EventHandler") {
      return `${parent.name}_handler`;
    }
    if (parent.type === "Action") {
      return `${parent.name}_function`;
    }
    return "func";
  }