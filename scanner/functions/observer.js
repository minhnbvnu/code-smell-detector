function observer() {
      var model = Ember.Handlebars.get(this, modelPath, options);
      set(childController, 'model', model);
      childView.rerender();
    }