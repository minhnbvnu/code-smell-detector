function add_to_map(from, to2) {
    from.forEach((exist, element) => {
      to2.set(element, higher_existence(exist, to2.get(element)));
    });
  }