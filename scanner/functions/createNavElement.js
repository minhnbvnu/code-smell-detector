function createNavElement(type) {
    if (navElementHtml[type]) {
      return jqLite(navElementHtml[type]);
    }
  }