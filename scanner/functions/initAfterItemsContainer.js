function initAfterItemsContainer() {
      var container = angular.element(
        scrollView.__content.querySelector('.collection-repeat-after-container')
      );
      // Put everything in the view after the repeater into a container.
      if (!container.length) {
        var elementIsAfterRepeater = false;
        var afterNodes = [].filter.call(scrollView.__content.childNodes, function(node) {
          if (ionic.DomUtil.contains(node, containerNode)) {
            elementIsAfterRepeater = true;
            return false;
          }
          return elementIsAfterRepeater;
        });
        container = angular.element('<span class="collection-repeat-after-container">');
        if (scrollView.options.scrollingX) {
          container.addClass('horizontal');
        }
        container.append(afterNodes);
        scrollView.__content.appendChild(container[0]);
      }
      return container;
    }