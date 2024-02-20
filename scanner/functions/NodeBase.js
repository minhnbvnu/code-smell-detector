function NodeBase(options, body, labelModule) {
      _classCallCheck(this, NodeBase);

      this.body = body;
      this.labelModule = labelModule;
      this.setOptions(options);
      this.top = undefined;
      this.left = undefined;
      this.height = undefined;
      this.width = undefined;
      this.radius = undefined;
      this.boundingBox = { top: 0, left: 0, right: 0, bottom: 0 };
    }