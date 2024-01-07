function pagesBeforeRef(kidRef) {
      let total = 0,
          parentRef;
      return xref.fetchAsync(kidRef).then(function (node) {
        if ((0, _primitives.isRefsEqual)(kidRef, pageRef) && !(0, _primitives.isDict)(node, "Page") && !((0, _primitives.isDict)(node) && !node.has("Type") && node.has("Contents"))) {
          throw new _util.FormatError("The reference does not point to a /Page dictionary.");
        }

        if (!node) {
          return null;
        }

        if (!(0, _primitives.isDict)(node)) {
          throw new _util.FormatError("Node must be a dictionary.");
        }

        parentRef = node.getRaw("Parent");
        return node.getAsync("Parent");
      }).then(function (parent) {
        if (!parent) {
          return null;
        }

        if (!(0, _primitives.isDict)(parent)) {
          throw new _util.FormatError("Parent must be a dictionary.");
        }

        return parent.getAsync("Kids");
      }).then(function (kids) {
        if (!kids) {
          return null;
        }

        const kidPromises = [];
        let found = false;

        for (let i = 0, ii = kids.length; i < ii; i++) {
          const kid = kids[i];

          if (!(0, _primitives.isRef)(kid)) {
            throw new _util.FormatError("Kid must be a reference.");
          }

          if ((0, _primitives.isRefsEqual)(kid, kidRef)) {
            found = true;
            break;
          }

          kidPromises.push(xref.fetchAsync(kid).then(function (obj) {
            if (!(0, _primitives.isDict)(obj)) {
              throw new _util.FormatError("Kid node must be a dictionary.");
            }

            if (obj.has("Count")) {
              total += obj.get("Count");
            } else {
              total++;
            }
          }));
        }

        if (!found) {
          throw new _util.FormatError("Kid reference not found in parent's kids.");
        }

        return Promise.all(kidPromises).then(function () {
          return [total, parentRef];
        });
      });
    }