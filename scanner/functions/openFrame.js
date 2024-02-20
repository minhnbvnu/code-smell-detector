function openFrame(node, value) {
      if (framesInStack.has(node.frame)) {
        stack.push(null);
      } else {
        framesInStack.add(node.frame);
        stack.push(node);
        builder.enterFrame(node.frame, value);
      }
    }