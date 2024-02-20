function createCodebook(tree) {
    return recurse(tree, "", {});

    function recurse(node, bitstring, dict) {
      if (!node.left && !node.right) {
        dict[node.key] = bitstring;
      } else {
        if (node.left) {
          recurse(node.left, `${bitstring}0`, dict);
        }

        if (node.right) {
          recurse(node.right, `${bitstring}1`, dict);
        }
      }
      return dict;
    }
  }