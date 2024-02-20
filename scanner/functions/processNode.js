function processNode(entry) {
        if (entry.processed) return entry;
        entry.processed = true;

        var elementNode = entry.domNode;
        var parentNode = elementNode.parentNode;
        lookup.put(elementNode, entry);

        var parentEntry;
        while (parentNode) {
          parentEntry = lookup.get(parentNode);
          if (parentEntry) {
            if (!parentEntry.processed) {
              parentEntry = processNode(parentEntry);
            }
            break;
          }
          parentNode = parentNode.parentNode;
        }

        (parentEntry || tree).children.push(entry);
        return entry;
      }