function tlvScopeStyle(state, indentation, type) {
    // Begin scope.
    var depth = indentation / tlvIndentUnit;  // TODO: Pass this in instead.
    return "tlv-" + state.tlvIndentationStyle[depth] + "-" + type;
  }