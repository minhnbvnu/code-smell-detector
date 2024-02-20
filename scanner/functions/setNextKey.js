function setNextKey(fields) {
  fields.forEach(function (field, index) {
    if (fields[index + 1] && field.item) field.item.setNextKeyView(fields[index + 1].item)
  })
}