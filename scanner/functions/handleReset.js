function handleReset() {
      var router = this.__container__.lookup('router:main');
      router.reset();

      Ember.run(this.__container__, 'destroy');

      this.buildContainer();

      Ember.run.schedule('actions', this, function() {
        this._initialize();
      });
    }