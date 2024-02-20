function getAccessors(target) {
    let accessors = accessorLookup.get(target);

    if (accessors === void 0) {
      let currentTarget = Reflect.getPrototypeOf(target);

      while (accessors === void 0 && currentTarget !== null) {
        accessors = accessorLookup.get(currentTarget);
        currentTarget = Reflect.getPrototypeOf(currentTarget);
      }

      if (accessors === void 0) {
        accessors = [];
      } else {
        accessors = accessors.slice(0);
      }

      accessorLookup.set(target, accessors);
    }

    return accessors;
  }