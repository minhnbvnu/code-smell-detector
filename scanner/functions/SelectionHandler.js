function SelectionHandler(body, canvas) {
      var _this = this;

      _classCallCheck(this, SelectionHandler);

      this.body = body;
      this.canvas = canvas;
      this.selectionObj = { nodes: [], edges: [] };
      this.hoverObj = { nodes: {}, edges: {} };

      this.options = {};
      this.defaultOptions = {
        multiselect: false,
        selectable: true,
        selectConnectedEdges: true,
        hoverConnectedEdges: true
      };
      util.extend(this.options, this.defaultOptions);

      this.body.emitter.on("_dataChanged", function () {
        _this.updateSelection();
      });
    }