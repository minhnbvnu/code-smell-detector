function addOrReuseElement(parent, current, type, templateElement) {
        var element;
        // Check whether we can reuse the next element
        if (current && lowercase(current.nodeName) === type) {
          // The next element is the right type so reuse it
          element = current;
        } else {
          // The next element is not the right type so create a new one
          element = templateElement.cloneNode(false);
          if (!current) {
            // There are no more elements so just append it to the select
            parent.appendChild(element);
          } else {
            // The next element is not a group so insert the new one
            parent.insertBefore(element, current);
          }
        }
        return element;
      }