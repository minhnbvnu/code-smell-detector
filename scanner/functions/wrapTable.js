function wrapTable(name, value) {
    if (isArray(value)) value = {columns: value}
    if (!value.text) value.text = name
    return value
  }