function isTargetNode(node, nodeNameMatch, textContentMatch) {
        var nodeName = node.nodeName,
          textContent = node.textContent;
        var nodeNameLowerCase = nodeName.toLowerCase();
        return textContent !== null && textContent !== "" && (nodeNameMatch instanceof RegExp ? nodeNameMatch.test(nodeNameLowerCase) : nodeNameMatch === nodeNameLowerCase) && (textContentMatch instanceof RegExp ? textContentMatch.test(textContent) : textContent.includes(textContentMatch));
      }