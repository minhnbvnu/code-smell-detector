function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }