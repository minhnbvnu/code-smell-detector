function d3_map_size() {
    var size = 0;
    for (var key in this._) ++size;
    return size;
  }