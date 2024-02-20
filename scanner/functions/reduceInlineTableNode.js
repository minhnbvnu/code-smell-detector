function reduceInlineTableNode(values) {
    var obj = Object.create(null);
    for (var i = 0; i < values.length; i++) {
      var val = values[i];
      if (val.value.type === "InlineTable") {
        obj[val.key] = reduceInlineTableNode(val.value.value);
      } else if (val.type === "InlineTableValue") {
        obj[val.key] = reduceValueNode(val.value);
      }
    }

    return obj;
  }