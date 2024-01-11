function Link (attrs) {
  return {
    tagName: 'link',
    attributes: attrs,
    exists: function () { return document.querySelector('link[rel="' + attrs.rel + '"]'); }
  };
}