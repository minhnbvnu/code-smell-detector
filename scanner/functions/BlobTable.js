function BlobTable(layers) {
    this.generateBlobsByNames = bind(this.generateBlobsByNames, this);
    this.getBlobByName = bind(this.getBlobByName, this);
    this.fillInternalTable = bind(this.fillInternalTable, this);
    this.table = {};
    this.fillInternalTable(layers);
  }