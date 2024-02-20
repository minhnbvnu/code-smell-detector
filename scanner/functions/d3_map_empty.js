function d3_map_empty() {
    for (var key in this._) return false;
    return true;
  }