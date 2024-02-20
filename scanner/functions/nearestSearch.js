function nearestSearch(node) {
        var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;

        function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }

        for (i = 0; i < dimensions.length; i += 1) {
          if (i === node.dimension) {
            linearPoint[dimensions[i]] = point[dimensions[i]];
          } else {
            linearPoint[dimensions[i]] = node.obj[dimensions[i]];
          }
        }

        linearDistance = metric(linearPoint, node.obj);

        if (node.right === null && node.left === null) {
          if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
            saveNode(node, ownDistance);
          }
          return;
        }

        if (node.right === null) {
          bestChild = node.left;
        } else if (node.left === null) {
          bestChild = node.right;
        } else {
          if (point[dimension] < node.obj[dimension]) {
            bestChild = node.left;
          } else {
            bestChild = node.right;
          }
        }

        nearestSearch(bestChild);

        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
          if (bestChild === node.left) {
            otherChild = node.right;
          } else {
            otherChild = node.left;
          }
          if (otherChild !== null) {
            nearestSearch(otherChild);
          }
        }
      }