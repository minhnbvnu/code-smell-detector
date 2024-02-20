function getSectionText(nodes) {
      return `${nodes
        .map((node) => {
          if (typeof node.comment !== 'undefined') {
            return `#${node.comment}`;
          } else {
            return node.tokens.join(' ');
          }
        })
        .join('\n')}\n`;
    }