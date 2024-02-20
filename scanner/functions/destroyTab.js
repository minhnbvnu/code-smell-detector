function destroyTab() {
          childScope && childScope.$destroy();
          isTabContentAttached && childElement && childElement.remove();
          tabContentEle.innerHTML = '';
          isTabContentAttached = childScope = childElement = null;
        }