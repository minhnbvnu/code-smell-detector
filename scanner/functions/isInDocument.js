function isInDocument(element) {
          return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
        }