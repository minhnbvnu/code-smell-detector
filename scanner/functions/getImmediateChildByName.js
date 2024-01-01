function getImmediateChildByName (object3d, value) {
      for (var i = 0, l = object3d.children.length; i < l; i++) {
        var obj = object3d.children[i];
        if (obj && obj['name'] === value) {
          return obj;
        }
      }
      return undefined;
    }