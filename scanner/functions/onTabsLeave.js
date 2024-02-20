function onTabsLeave(ev, data) {
    var viewElements = $element.children();
    var viewElement, viewScope;

    for (var x = 0, l = viewElements.length; x < l; x++) {
      viewElement = viewElements.eq(x);
      if (navViewAttr(viewElement) == VIEW_STATUS_ACTIVE) {
        viewScope = viewElement.scope();
        viewScope && viewScope.$emit(ev.name.replace('Tabs', 'View'), data);
        viewScope && viewScope.$broadcast(ev.name.replace('Tabs', 'ParentView'), data);
        break;
      }
    }
  }