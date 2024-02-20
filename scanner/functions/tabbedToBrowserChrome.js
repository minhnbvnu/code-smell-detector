function tabbedToBrowserChrome(event) {
    var elements = popoverRef.current ? tabbable_default()(ownerDocument).filter(function (element) {
      return !popoverRef.current.contains(element);
    }) : null;
    return elements ? event.target === elements[elements.length - 1] : false;
  }