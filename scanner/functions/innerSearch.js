function innerSearch(node, parent) {

        if (node === null) {
          return parent;
        }

        var dimension = dimensions[node.dimension];
        if (point[dimension] < node.obj[dimension]) {
          return innerSearch(node.left, node);
        } else {
          return innerSearch(node.right, node);
        }
      }