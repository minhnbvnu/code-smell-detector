function NodesGenerator(blobTable1) {
    this.blobTable = blobTable1;
    this.getFirstWriterNode = bind(this.getFirstWriterNode, this);
    this.connectSingleNodeWithBlobs = bind(this.connectSingleNodeWithBlobs, this);
    this.connectNodesWithBlobs = bind(this.connectNodesWithBlobs, this);
    this.connectNonInplaceNodes = bind(this.connectNonInplaceNodes, this);
    this.connectInplaceNodes = bind(this.connectInplaceNodes, this);
    this.connectNodesWithEachOther = bind(this.connectNodesWithEachOther, this);
    this.fillNetwork = bind(this.fillNetwork, this);
  }