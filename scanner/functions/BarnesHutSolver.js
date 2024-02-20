function BarnesHutSolver(body, physicsBody, options) {
      _classCallCheck(this, BarnesHutSolver);

      this.body = body;
      this.physicsBody = physicsBody;
      this.barnesHutTree;
      this.setOptions(options);
      this.randomSeed = 5;
    }