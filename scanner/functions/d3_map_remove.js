function d3_map_remove(key) {
    return (key = d3_map_escape(key)) in this._ && delete this._[key];
  }