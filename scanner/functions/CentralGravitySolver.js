function CentralGravitySolver(body, physicsBody, options) {
      _classCallCheck(this, CentralGravitySolver);

      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options);
    }