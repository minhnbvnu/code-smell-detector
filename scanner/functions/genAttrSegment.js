function genAttrSegment (name, value) {
  if (plainStringRE.test(value)) {
    // force double quote
    value = value.replace(/^'|'$/g, '"');
    // force enumerated attr to "true"
    if (isEnumeratedAttr(name) && value !== "\"false\"") {
      value = "\"true\"";
    }
    return {
      type: RAW,
      value: isBooleanAttr(name)
        ? (" " + name + "=\"" + name + "\"")
        : value === '""'
          ? (" " + name)
          : (" " + name + "=" + value)
    }
  } else {
    return {
      type: EXPRESSION,
      value: ("_ssrAttr(" + (JSON.stringify(name)) + "," + value + ")")
    }
  }
}