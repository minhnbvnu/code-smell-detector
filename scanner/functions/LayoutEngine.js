function LayoutEngine(body) {
      _classCallCheck(this, LayoutEngine);

      this.body = body;

      this.initialRandomSeed = Math.round(Math.random() * 1000000);
      this.randomSeed = this.initialRandomSeed;
      this.options = {};
      this.optionsBackup = {};

      this.defaultOptions = {
        randomSeed: undefined,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          direction: 'UD', // UD, DU, LR, RL
          sortMethod: 'hubsize' // hubsize, directed
        }
      };
      util.extend(this.options, this.defaultOptions);

      this.hierarchicalLevels = {};

      this.bindEventListeners();
    }