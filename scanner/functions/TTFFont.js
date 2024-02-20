function TTFFont(rawData) {
    var data;
    this.rawData = rawData;
    data = this.contents = new Data(rawData);
    this.contents.pos = 4;
    if (data.readString(4) === "ttcf") {
      throw new Error("TTCF not supported.");
    } else {
      data.pos = 0;
      this.parse();
      this.subset = new Subset(this);
      this.registerTTF();
    }
  }