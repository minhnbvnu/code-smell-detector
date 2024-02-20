function matchingLabels(el) {
    let labels = Array.from(/** @type {HTMLInputElement} */(el).labels || []);
    // IE doesn't have `labels` and Safari doesn't populate `labels`
    // if element is in a shadowroot.
    // In this instance, finding the non-ancestor labels is enough,
    // as the mouseCancellor code will handle ancstor labels
    if (!labels.length) {
      labels = [];
      let root = el.getRootNode();
      // if there is an id on `el`, check for all labels with a matching `for` attribute
      if (el.id) {
        let matching = root.querySelectorAll(`label[for = ${el.id}]`);
        for (let i = 0; i < matching.length; i++) {
          labels.push(/** @type {!HTMLLabelElement} */(matching[i]));
        }
      }
    }
    return labels;
  }