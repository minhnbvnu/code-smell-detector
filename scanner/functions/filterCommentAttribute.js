function filterCommentAttribute(node, attributeName) {
      if (node[attributeName]) {
        const leftoverComments = node[attributeName].filter(
          JavaScript.shouldCommentNodeBePreservedInNonPrettyPrintedOutput
        );
        if (leftoverComments.length > 0) {
          node[attributeName] = leftoverComments;
        } else {
          node[attributeName] = undefined;
        }
      }
    }