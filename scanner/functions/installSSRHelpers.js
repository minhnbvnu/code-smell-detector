function installSSRHelpers (vm) {
  if (vm._ssrNode) { return }
  var Ctor = vm.constructor;
  while (Ctor.super) {
    Ctor = Ctor.super;
  }
  Object.assign(Ctor.prototype, {
    _ssrEscape: escape,
    _ssrNode: renderStringNode$1,
    _ssrList: renderStringList,
    _ssrAttr: renderAttr,
    _ssrAttrs: renderAttrs$1,
    _ssrDOMProps: renderDOMProps$1,
    _ssrClass: renderSSRClass,
    _ssrStyle: renderSSRStyle
  });
}