function replaceNodeText(source, node, pattern, replacement) {
        var textContent = node.textContent;
        if (textContent) {
          node.textContent = textContent.replace(pattern, replacement);
          hit(source);
        }
      }