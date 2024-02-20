function createBasicRenderer (ref) {
  if ( ref === void 0 ) ref = {};
  var modules = ref.modules; if ( modules === void 0 ) modules = [];
  var directives = ref.directives; if ( directives === void 0 ) directives = {};
  var isUnaryTag = ref.isUnaryTag; if ( isUnaryTag === void 0 ) isUnaryTag = (function () { return false; });
  var cache = ref.cache;

  var render = createRenderFunction(modules, directives, isUnaryTag, cache);

  return function renderToString (
    component,
    context,
    done
  ) {
    if (typeof context === 'function') {
      done = context;
      context = {};
    }
    var result = '';
    var write = createWriteFunction(function (text) {
      result += text;
      return false
    }, done);
    try {
      render(component, write, context, function () {
        done(null, result);
      });
    } catch (e) {
      done(e);
    }
  }
}