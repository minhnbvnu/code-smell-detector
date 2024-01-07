function layoutClass(node) {
  switch (node.layout) {
    case "position":
      return "xfaPosition";

    case "lr-tb":
      return "xfaLrTb";

    case "rl-row":
      return "xfaRlRow";

    case "rl-tb":
      return "xfaRlTb";

    case "row":
      return "xfaRow";

    case "table":
      return "xfaTable";

    case "tb":
      return "xfaTb";

    default:
      return "xfaPosition";
  }
}