function primitiveFactory (definition, attributes, cb, preCb) {
    var el = helpers.entityFactory();
    var tagName = 'a-test-' + primitiveId++;
    registerPrimitive(tagName, definition);
    if (preCb) { preCb(el.sceneEl); }
    if (cb) {
      el.addEventListener('child-attached', function (evt) {
        evt.detail.el.addEventListener('loaded', function () {
          cb(el.children[0], tagName);
        });
      });
    }
    el.innerHTML = `<${tagName} ${attributes}></${tagName}>`;
  }