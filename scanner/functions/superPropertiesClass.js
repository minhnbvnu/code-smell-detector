function superPropertiesClass(constructor) {
      const superCtor = Object.getPrototypeOf(constructor);

      // Note, the `PropertiesMixin` class below only refers to the class
      // generated by this call to the mixin; the instanceof test only works
      // because the mixin is deduped and guaranteed only to apply once, hence
      // all constructors in a proto chain will see the same `PropertiesMixin`
      return (superCtor.prototype instanceof PropertiesMixin) ?
        /** @type {PropertiesMixinConstructor} */ (superCtor) : null;
    }