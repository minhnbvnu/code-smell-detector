function d3_map_has(key) {
    return d3_map_escape(key) in this._;
  }