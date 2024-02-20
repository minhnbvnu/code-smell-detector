function getTemplateFromDomModule(is) {
      let template = null;
      if (is && Polymer.DomModule) {
        template = Polymer.DomModule.import(is, 'template');
        // Under strictTemplatePolicy, require any element with an `is`
        // specified to have a dom-module
        if (Polymer.strictTemplatePolicy && !template) {
          throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${is}`);
        }
      }
      return template;
    }