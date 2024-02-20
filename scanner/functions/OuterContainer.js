function OuterContainer (spec) {
      var root = build$1(Container.sketch({
        dom: { classes: [resolve('outer-container')].concat(spec.classes) },
        containerBehaviours: derive$1([Swapping.config({
            alpha: READ_ONLY_MODE_CLASS,
            omega: EDIT_MODE_CLASS
          })])
      }));
      return takeover(root);
    }