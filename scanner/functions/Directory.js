function Directory(data) {
    var entry, i, _ref;
    this.scalarType = data.readInt();
    this.tableCount = data.readShort();
    this.searchRange = data.readShort();
    this.entrySelector = data.readShort();
    this.rangeShift = data.readShort();
    this.tables = {};
    for (
      i = 0, _ref = this.tableCount;
      0 <= _ref ? i < _ref : i > _ref;
      i = 0 <= _ref ? ++i : --i
    ) {
      entry = {
        tag: data.readString(4),
        checksum: data.readInt(),
        offset: data.readInt(),
        length: data.readInt()
      };
      this.tables[entry.tag] = entry;
    }
  }