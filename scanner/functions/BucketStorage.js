function BucketStorage(name) {
    _classCallCheck(this, BucketStorage);

    this.name = name;
    this.baseStorage = _coreCore.IonicPlatform.getStorage();
  }