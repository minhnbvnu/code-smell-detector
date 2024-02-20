function handleChildTextPlaceholders(childText, parent, onlyChild) {
    var i = 0;
    var parts = childText.split(/(__\$props__\[\d*\])/g)
    for (i = 0; i < parts.length; i++) {
      if (parts[i].trim() !== "") {
        //set the children to this object
        parent.children.push(parts[i]);
      }
    }
    childText = null;

    return childText;
  }