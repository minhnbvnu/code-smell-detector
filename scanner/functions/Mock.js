function Mock() {
      var instance = _.mixin({}, Constructor.prototype);

      for (var key in instance) {
        if (typeof instance[key] === 'function') {
          spyOn(instance, key);

          // special case for some components
          if (key === 'bind') {
            instance[key].andCallFake(function() { return this; });
          }
        }
      }

      // have the event emitter methods call through
      instance.onSync && instance.onSync.andCallThrough();
      instance.onAsync && instance.onAsync.andCallThrough();
      instance.off && instance.off.andCallThrough();
      instance.trigger && instance.trigger.andCallThrough();

      instance.constructor = Constructor;

      return instance;
    }