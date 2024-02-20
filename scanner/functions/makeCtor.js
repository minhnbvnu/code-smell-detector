function makeCtor() {

  // Note: avoid accessing any properties on the object since it makes the
  // method a lot faster. This is glue code so we want it to be as fast as
  // possible.

  var wasApplied = false, initMixins, initProperties;

  var Class = function() {
    if (!wasApplied) {
      Class.proto(); // prepare prototype...
    }
    o_defineProperty(this, GUID_KEY, undefinedDescriptor);
    o_defineProperty(this, '_super', undefinedDescriptor);
    var m = meta(this), proto = m.proto;
    m.proto = this;
    if (initMixins) {
      // capture locally so we can clear the closed over variable
      var mixins = initMixins;
      initMixins = null;
      this.reopen.apply(this, mixins);
    }
    if (initProperties) {
      // capture locally so we can clear the closed over variable
      var props = initProperties;
      initProperties = null;

      var concatenatedProperties = this.concatenatedProperties;

      for (var i = 0, l = props.length; i < l; i++) {
        var properties = props[i];

        Ember.assert("Ember.Object.create no longer supports mixing in other definitions, use createWithMixins instead.", !(properties instanceof Ember.Mixin));

        for (var keyName in properties) {
          if (!properties.hasOwnProperty(keyName)) { continue; }

          var value = properties[keyName],
              IS_BINDING = Ember.IS_BINDING;

          if (IS_BINDING.test(keyName)) {
            var bindings = m.bindings;
            if (!bindings) {
              bindings = m.bindings = {};
            } else if (!m.hasOwnProperty('bindings')) {
              bindings = m.bindings = o_create(m.bindings);
            }
            bindings[keyName] = value;
          }

          var desc = m.descs[keyName];

          Ember.assert("Ember.Object.create no longer supports defining computed properties.", !(value instanceof Ember.ComputedProperty));
          Ember.assert("Ember.Object.create no longer supports defining methods that call _super.", !(typeof value === 'function' && value.toString().indexOf('._super') !== -1));
          Ember.assert("`actions` must be provided at extend time, not at create time, when Ember.ActionHandler is used (i.e. views, controllers & routes).", !((keyName === 'actions') && Ember.ActionHandler.detect(this)));

          if (concatenatedProperties && indexOf(concatenatedProperties, keyName) >= 0) {
            var baseValue = this[keyName];

            if (baseValue) {
              if ('function' === typeof baseValue.concat) {
                value = baseValue.concat(value);
              } else {
                value = Ember.makeArray(baseValue).concat(value);
              }
            } else {
              value = Ember.makeArray(value);
            }
          }

          if (desc) {
            desc.set(this, keyName, value);
          } else {
            if (typeof this.setUnknownProperty === 'function' && !(keyName in this)) {
              this.setUnknownProperty(keyName, value);
            } else if (MANDATORY_SETTER) {
              Ember.defineProperty(this, keyName, null, value); // setup mandatory setter
            } else {
              this[keyName] = value;
            }
          }
        }
      }
    }
    finishPartial(this, m);
    this.init.apply(this, arguments);
    m.proto = proto;
    finishChains(this);
    sendEvent(this, "init");
  };

  Class.toString = Mixin.prototype.toString;
  Class.willReopen = function() {
    if (wasApplied) {
      Class.PrototypeMixin = Mixin.create(Class.PrototypeMixin);
    }

    wasApplied = false;
  };
  Class._initMixins = function(args) { initMixins = args; };
  Class._initProperties = function(args) { initProperties = args; };

  Class.proto = function() {
    var superclass = Class.superclass;
    if (superclass) { superclass.proto(); }

    if (!wasApplied) {
      wasApplied = true;
      Class.PrototypeMixin.applyPartial(Class.prototype);
      rewatch(Class.prototype);
    }

    return this.prototype;
  };

  return Class;

}