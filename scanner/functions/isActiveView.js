function isActiveView (node) {
          // walk up the child-parent node chain until we get to the root or the BODY
          while (node !== null && node.nodeName !== 'BODY') {
            var navView = node.getAttribute("nav-view");

            // as soon as we encounter a cached (parent) view then we know the view can't be active
            if (navView !== null && navView === 'cached') {
              return false;
            }
            node = node.parentNode;
          }
          // no cached parent seen, the view must be really active
          return true;
        }