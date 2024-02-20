function AuthenticationHelper(PoolName) {
    _classCallCheck(this, AuthenticationHelper);

    this.N = new _BigInteger2.default(initN, 16);
    this.g = new _BigInteger2.default('2', 16);
    this.k = new _BigInteger2.default(this.hexHash('00' + this.N.toString(16) + '0' + this.g.toString(16)), 16);

    this.smallAValue = this.generateRandomSmallA();
    this.getLargeAValue(function () {});

    this.infoBits = new _global.util.Buffer('Caldera Derived Key', 'utf8');

    this.poolName = PoolName;
  }