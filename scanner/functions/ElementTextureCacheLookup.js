constructor(getKey, doesEleInvalidateKey = util.falsify){
    this.idsByKey = new Map();
    this.keyForId = new Map();
    this.cachesByLvl = new Map();
    this.lvls = [];
    this.getKey = getKey;
    this.doesEleInvalidateKey = doesEleInvalidateKey;
  }