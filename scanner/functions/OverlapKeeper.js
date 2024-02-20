function OverlapKeeper() {
    this.overlappingShapesLastState = new TupleDictionary();
    this.overlappingShapesCurrentState = new TupleDictionary();
    this.recordPool = new OverlapKeeperRecordPool({ size: 16 });
    this.tmpDict = new TupleDictionary();
    this.tmpArray1 = [];
}