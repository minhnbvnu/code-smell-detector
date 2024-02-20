function removeExcessElements(current) {
        var next;
        while (current) {
          next = current.nextSibling;
          jqLiteRemove(current);
          current = next;
        }
      }