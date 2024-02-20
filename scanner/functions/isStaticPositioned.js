function isStaticPositioned(element) {
    return (getStyle(element, 'position') || 'static') === 'static';
  }