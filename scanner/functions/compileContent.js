function compileContent(context, node, walker) {
  const parseResult = parseContent(context, node.textContent);

  if (parseResult !== null) {
    let lastNode = node;

    for (let i = 0, ii = parseResult.length; i < ii; ++i) {
      const currentPart = parseResult[i];
      const currentNode = i === 0 ? node : lastNode.parentNode.insertBefore(document.createTextNode(""), lastNode.nextSibling);

      if (typeof currentPart === "string") {
        currentNode.textContent = currentPart;
      } else {
        currentNode.textContent = " ";
        context.captureContentBinding(currentPart);
      }

      lastNode = currentNode;
      context.targetIndex++;

      if (currentNode !== node) {
        walker.nextNode();
      }
    }

    context.targetIndex--;
  }
}