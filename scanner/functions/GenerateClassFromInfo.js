function GenerateClassFromInfo(info, Base, behaviors) {

      // manages behavior and lifecycle processing (filled in after class definition)
      let behaviorList;
      const lifecycle = {};

      /** @private */
      class PolymerGenerated extends Base {

        // explicitly not calling super._finalizeClass
        static _finalizeClass() {
          // if calling via a subclass that hasn't been generated, pass through to super
          if (!this.hasOwnProperty(window.JSCompiler_renameProperty('generatedFrom', this))) {
            super._finalizeClass();
          } else {
            // interleave properties and observers per behavior and `info`
            if (behaviorList) {
              for (let i=0, b; i < behaviorList.length; i++) {
                b = behaviorList[i];
                if (b.properties) {
                  this.createProperties(b.properties);
                }
                if (b.observers) {
                  this.createObservers(b.observers, b.properties);
                }
              }
            }
            if (info.properties) {
              this.createProperties(info.properties);
            }
            if (info.observers) {
              this.createObservers(info.observers, info.properties);
            }
            // make sure to prepare the element template
            this._prepareTemplate();
          }
        }

        static get properties() {
          const properties = {};
          if (behaviorList) {
            for (let i=0; i < behaviorList.length; i++) {
              Object.assign(properties, behaviorList[i].properties);
            }
          }
          Object.assign(properties, info.properties);
          return properties;
        }

        static get observers() {
          let observers = [];
          if (behaviorList) {
            for (let i=0, b; i < behaviorList.length; i++) {
              b = behaviorList[i];
              if (b.observers) {
                observers = observers.concat(b.observers);
              }
            }
          }
          if (info.observers) {
            observers = observers.concat(info.observers);
          }
          return observers;
        }

        /**
         * @return {void}
         */
        created() {
          super.created();
          const list = lifecycle.created;
          if (list) {
            for (let i=0; i < list.length; i++) {
              list[i].call(this);
            }
          }
        }

        /**
         * @return {void}
         */
        _registered() {
          /* NOTE: `beforeRegister` is called here for bc, but the behavior
            is different than in 1.x. In 1.0, the method was called *after*
            mixing prototypes together but *before* processing of meta-objects.
            However, dynamic effects can still be set here and can be done either
            in `beforeRegister` or `registered`. It is no longer possible to set
            `is` in `beforeRegister` as you could in 1.x.
          */
          // only proceed if the generated class' prototype has not been registered.
          const generatedProto = PolymerGenerated.prototype;
          if (!generatedProto.hasOwnProperty('__hasRegisterFinished')) {
            generatedProto.__hasRegisterFinished = true;
            // ensure superclass is registered first.
            super._registered();
            // copy properties onto the generated class lazily if we're optimizing,
            if (Polymer.legacyOptimizations) {
              copyPropertiesToProto(generatedProto);
            }
            // make sure legacy lifecycle is called on the *element*'s prototype
            // and not the generated class prototype; if the element has been
            // extended, these are *not* the same.
            const proto = Object.getPrototypeOf(this);
            let list = lifecycle.beforeRegister;
            if (list) {
              for (let i=0; i < list.length; i++) {
                list[i].call(proto);
              }
            }
            list = lifecycle.registered;
            if (list) {
              for (let i=0; i < list.length; i++) {
                list[i].call(proto);
              }
            }
          }
        }

        /**
         * @return {void}
         */
        _applyListeners() {
          super._applyListeners();
          const list = lifecycle.listeners;
          if (list) {
            for (let i=0; i < list.length; i++) {
              const listeners = list[i];
              if (listeners) {
                for (let l in listeners) {
                  this._addMethodEventListenerToNode(this, l, listeners[l]);
                }
              }
            }
          }
        }

        // note: exception to "super then me" rule;
        // do work before calling super so that super attributes
        // only apply if not already set.
        /**
         * @return {void}
         */
        _ensureAttributes() {
          const list = lifecycle.hostAttributes;
          if (list) {
            for (let i=list.length-1; i >= 0; i--) {
              const hostAttributes = list[i];
              for (let a in hostAttributes) {
                  this._ensureAttribute(a, hostAttributes[a]);
                }
            }
          }
          super._ensureAttributes();
        }

        /**
         * @return {void}
         */
        ready() {
          super.ready();
          let list = lifecycle.ready;
          if (list) {
            for (let i=0; i < list.length; i++) {
              list[i].call(this);
            }
          }
        }

        /**
         * @return {void}
         */
        attached() {
          super.attached();
          let list = lifecycle.attached;
          if (list) {
            for (let i=0; i < list.length; i++) {
              list[i].call(this);
            }
          }
        }

        /**
         * @return {void}
         */
        detached() {
          super.detached();
          let list = lifecycle.detached;
          if (list) {
            for (let i=0; i < list.length; i++) {
              list[i].call(this);
            }
          }
        }

        /**
         * Implements native Custom Elements `attributeChangedCallback` to
         * set an attribute value to a property via `_attributeToProperty`.
         *
         * @param {string} name Name of attribute that changed
         * @param {?string} old Old attribute value
         * @param {?string} value New attribute value
         * @return {void}
         */
        attributeChanged(name, old, value) {
          super.attributeChanged();
          let list = lifecycle.attributeChanged;
          if (list) {
            for (let i=0; i < list.length; i++) {
              list[i].call(this, name, old, value);
            }
          }
        }
      }

      // apply behaviors, note actual copying is done lazily at first instance creation
      if (behaviors) {
        // NOTE: ensure the behavior is extending a class with
        // legacy element api. This is necessary since behaviors expect to be able
        // to access 1.x legacy api.
        if (!Array.isArray(behaviors)) {
          behaviors = [behaviors];
        }
        let superBehaviors = Base.prototype.behaviors;
        // get flattened, deduped list of behaviors *not* already on super class
        behaviorList = flattenBehaviors(behaviors, null, superBehaviors);
        PolymerGenerated.prototype.behaviors = superBehaviors ?
          superBehaviors.concat(behaviors) : behaviorList;
      }

      const copyPropertiesToProto = (proto) => {
        if (behaviorList) {
          applyBehaviors(proto, behaviorList, lifecycle);
        }
        applyInfo(proto, info, lifecycle, excludeOnInfo);
      };

      // copy properties if we're not optimizing
      if (!Polymer.legacyOptimizations) {
        copyPropertiesToProto(PolymerGenerated.prototype);
      }

      PolymerGenerated.generatedFrom = info;

      return PolymerGenerated;
    }