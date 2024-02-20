function EdgeBase(options, body, labelModule) {
      _classCallCheck(this, EdgeBase);

      this.body = body;
      this.labelModule = labelModule;
      this.setOptions(options);
      this.colorDirty = true;
      this.color = {};
      this.selectionWidth = 2;
      this.hoverWidth = 1.5;
    }