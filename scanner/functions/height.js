function height(g, u) {
    switch(g.graph().rankDir) {
      case 'LR': return g.node(u).width;
      case 'RL': return g.node(u).width;
      default:   return g.node(u).height;
    }
  }