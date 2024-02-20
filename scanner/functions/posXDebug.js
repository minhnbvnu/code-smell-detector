function posXDebug(name, g, u, x) {
    if (g.graph().rankDir === 'LR' || g.graph().rankDir === 'RL') {
      if (arguments.length < 3) {
        return g.node(u)[name];
      } else {
        g.node(u)[name] = x;
      }
    } else {
      if (arguments.length < 3) {
        return g.node(u)[name];
      } else {
        g.node(u)[name] = x;
      }
    }
  }