function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);
    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }