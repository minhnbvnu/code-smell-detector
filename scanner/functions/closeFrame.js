function closeFrame(node, value) {
      const stackTop = stack.pop();

      if (stackTop) {
        framesInStack.delete(stackTop.frame);
        builder.leaveFrame(stackTop.frame, value);
      }
    }