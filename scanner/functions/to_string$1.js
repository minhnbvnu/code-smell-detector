function to_string$1(node2) {
    switch (node2.type) {
      case "Literal":
        return String(node2.value);
      case "Identifier":
        return node2.name;
    }
  }