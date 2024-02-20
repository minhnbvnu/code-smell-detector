function createRenderer$1 (ref) {
  if ( ref === void 0 ) ref = {};
  var modules = ref.modules; if ( modules === void 0 ) modules = [];
  var directives = ref.directives; if ( directives === void 0 ) directives = {};
  var isUnaryTag = ref.isUnaryTag; if ( isUnaryTag === void 0 ) isUnaryTag = (function () { return false; });
  var template = ref.template;
  var inject = ref.inject;
  var cache = ref.cache;
  var shouldPreload = ref.shouldPreload;
  var clientManifest = ref.clientManifest;

  var render = createRenderFunction(modules, directives, isUnaryTag, cache);
  var templateRenderer = new TemplateRenderer({
    template: template,
    inject: inject,
    shouldPreload: shouldPreload,
    clientManifest: clientManifest
  });

  return {
    renderToString: function renderToString (
      component,
      context,
      done
    ) {
      if (typeof context === 'function') {
        done = context;
        context = {};
      }
      if (context) {
        templateRenderer.bindRenderFns(context);
      }
      var result = '';
      var write = createWriteFunction(function (text) {
        result += text;
        return false
      }, done);
      try {
        render(component, write, context, function () {
          if (template) {
            result = templateRenderer.renderSync(result, context);
          }
          done(null, result);
        });
      } catch (e) {
        done(e);
      }
    },

    renderToStream: function renderToStream (
      component,
      context
    ) {
      if (context) {
        templateRenderer.bindRenderFns(context);
      }
      var renderStream = new RenderStream(function (write, done) {
        render(component, write, context, done);
      });
      if (!template) {
        return renderStream
      } else {
        var templateStream = templateRenderer.createStream(context);
        renderStream.on('error', function (err) {
          templateStream.emit('error', err);
        });
        renderStream.pipe(templateStream);
        return templateStream
      }
    }
  }
}