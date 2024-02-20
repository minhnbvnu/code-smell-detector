function createTemplatizerClass(template, templateInfo, options) {
      // Anonymous class created by the templatize
      let base = options.mutableData ?
        MutableTemplateInstanceBase : TemplateInstanceBase;
      // Affordance for global mixins onto TemplatizeInstance
      if (Polymer.Templatize.mixin) {
        base = Polymer.Templatize.mixin(base);
      }
      /**
       * @constructor
       * @extends {base}
       * @private
       */
      let klass = class extends base { };
      klass.prototype.__templatizeOptions = options;
      klass.prototype._bindTemplate(template);
      addNotifyEffects(klass, template, templateInfo, options);
      return klass;
    }