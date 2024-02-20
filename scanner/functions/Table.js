function Table(file) {
    var info;
    this.file = file;
    info = this.file.directory.tables[this.tag];
    this.exists = !!info;
    if (info) {
      (this.offset = info.offset), (this.length = info.length);
      this.parse(this.file.contents);
    }
  }