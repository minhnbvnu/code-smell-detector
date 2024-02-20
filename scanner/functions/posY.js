function posY(g, u, y) {
    if (g.graph().rankDir === 'LR' || g.graph().rankDir === 'RL') {
      if (arguments.length < 3) {
        return g.node(u).x;
      } else {
        g.node(u).x = y;
      }
    } else {
      if (arguments.length < 3) {
        return g.node(u).y;
      } else {
        g.node(u).y = y;
      }
    }
  }