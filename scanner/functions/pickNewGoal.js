function pickNewGoal(node, nodeId) {
    node.sx = node.x; node.sy = node.y;
    node.tx = random.gaussian() * width;
    node.ty = random.gaussian() * height;
    node.t = 0;
    node.maxT = Math.abs(Math.round(random.gaussian() * speed)) + 400;

    node.strategy = WANDER; // Math.random() < 0.8 ? FOLLOW : WANDER;
    if (node.strategy === FOLLOW) {
      node.follow = getNodeToFollow(nodeId)
      if (!node.follow) node.strategy = WANDER;
    } else {
      node.follow = null;
    }
  }