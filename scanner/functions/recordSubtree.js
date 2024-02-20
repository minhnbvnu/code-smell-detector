function recordSubtree(focalFrameNode) {
      const stack = [];

      function visit(node) {
        stack.push(node.frame);
        builder.appendSampleWithWeight(stack, node.getSelfWeight());

        for (let child of node.children) {
          visit(child);
        }

        stack.pop();
      }

      visit(focalFrameNode);
    }