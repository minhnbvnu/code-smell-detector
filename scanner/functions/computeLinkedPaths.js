function computeLinkedPaths(inst, path, value) {
    let links = inst.__dataLinkedPaths;
    if (links) {
      let link;
      for (let a in links) {
        let b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }