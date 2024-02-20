function buildUniversalChildren(root, tagParams, childrenProp, component) {
    var childrenText = [];
    var i = 0;
    var n = 0;
    var key = "";
    var matches = null;

    //if the node has children that is an array, handle it with a loop
    if (root.children != null && root.children instanceof Array) {
      for (i = 0, n = root.children.length; i < n; i++) {
        if (root.children[i] != null) {
          if (typeof root.children[i] === "string") {
            root.children[i] = root.children[i].replace(/(\r\n|\n|\r)/gm, "");
            matches = root.children[i].match(/__\$props__\[\d*\]/g);
            if (matches !== null) {
              childrenText.push(root.children[i]);
            } else {
              childrenText.push("'" + root.children[i] + "'");
            }
          } else {
            buildFunction(root.children[i], childrenText, component)
          }
        }
      }
      //push the children code into our tag params code
      if (childrenText.length === 1) {
        tagParams.push((childrenProp ? "children: " : "") + childrenText);
      } else if (childrenText.length > 1) {
        tagParams.push((childrenProp ? "children: " : "") + "[" + childrenText.join(",") + "]");
      }

    } else if (root.children != null && typeof root.children === "string") {
      root.children = root.children.replace(/(\r\n|\n|\r)/gm, "").trim();
      //this ensures its a prop replacement
      matches = root.children.match(/__\$props__\[\d*\]/g);
      //find any template strings and replace them
      if (matches !== null) {
        root.children = root.children.replace(/(__\$props__\[.*\])/g, "',$1,'")
      }
      //if the last two characters are ,', replace them with nothing
      if (root.children.substring(root.children.length - 2) === ",'") {
        root.children = root.children.substring(0, root.children.length - 2);
        tagParams.push((childrenProp ? "children: " : "") + "['" + root.children + "]");
      } else {
        tagParams.push((childrenProp ? "children: " : "") + "['" + root.children + "']");
      }
    }
  }