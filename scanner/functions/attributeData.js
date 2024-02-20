function attributeData(node) {
    var store = {}
    $.each(node.attributes, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] = attr.value
    })
    return store
  }