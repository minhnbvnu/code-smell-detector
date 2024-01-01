function Meta (attrs) {
  return {
    tagName: 'meta',
    attributes: attrs,
    exists: function () { return document.querySelector('meta[name="' + attrs.name + '"]'); }
  };
}