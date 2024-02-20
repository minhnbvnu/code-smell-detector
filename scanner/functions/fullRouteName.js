function fullRouteName(router, name) {
    if (!router.hasRoute(name)) {
      name = name + '.index';
    }

    return name;
  }