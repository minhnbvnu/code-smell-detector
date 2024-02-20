function checkCycle(vertex, path) {
    if (vertex.name === toName) {
      throw new Error("cycle detected: " + toName + " <- " + path.join(" <- "));
    }
  }