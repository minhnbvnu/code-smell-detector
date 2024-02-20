function buildReactChildren(root, tagParams, childrenProp, component) {
    var childrenText = [];
    var i = 0;
    var n = 0;
    var matches = null;

    //if the node has children that is an array, handle it with a loop
    if (root.children != null && root.children instanceof Array) {
      //we're building an array in code, so we need an open bracket
      for (i = 0, n = root.children.length; i < n; i++) {
        if (root.children[i] != null) {
          if (typeof root.children[i] === "string") {
            root.children[i] = root.children[i].replace(/(\r\n|\n|\r)/gm, "");
            matches = root.children[i].match(/__\$props__\[\d*\]/g);
            if (matches != null) {
              root.children[i] = root.children[i].replace(/(__\$props__\[[0-9]*\])/g, "$1")
              if (root.children[i].substring(root.children[i].length - 1) === ",") {
                root.children[i] = root.children[i].substring(0, root.children[i].length - 1);
              }
              childrenText.push(root.children[i]);
            } else {
              childrenText.push("'" + root.children[i] + "'");
            }

          } else {
            buildFunction(root.children[i], childrenText, i === root.children.length - 1, component)
          }
        }
      }
      //push the children code into our tag params code
      if (childrenText.length > 0) {
        tagParams.push(childrenText.join(","));
      }

    } else if (root.children != null && typeof root.children === "string") {
      root.children = root.children.replace(/(\r\n|\n|\r)/gm, "");
      tagParams.push("'" + root.children + "'");
    }
  }