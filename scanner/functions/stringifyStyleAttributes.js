function stringifyStyleAttributes(filteredAST) {
    return filteredAST.nodes[0].nodes.reduce(function (extractedAttributes, attrObject) {
      extractedAttributes.push("".concat(attrObject.prop, ":").concat(attrObject.value).concat(attrObject.important ? ' !important' : ''));
      return extractedAttributes;
    }, []).join(';');
  }