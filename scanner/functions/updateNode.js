function updateNode(node, key) {
    if (node.t > node.maxT) {
      pickNewGoal(node, key);
    }

    let t = ease(node.t/node.maxT);
    if (node.strategy === WANDER || !node.follow) {
      node.x = node.sx * (1 - t) + node.tx * t;
      node.y = node.sy * (1 - t) + node.ty * t;
    } else {
      node.x = node.sx * (1 - t) + node.follow.x * t;
      node.y = node.sy * (1 - t) + node.follow.y * t;
    }
    node.t += 1;
  }