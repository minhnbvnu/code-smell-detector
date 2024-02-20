function ManipulationSystem(body, canvas, selectionHandler) {
      var _this = this;

      _classCallCheck(this, ManipulationSystem);

      this.body = body;
      this.canvas = canvas;
      this.selectionHandler = selectionHandler;

      this.editMode = false;
      this.manipulationDiv = undefined;
      this.editModeDiv = undefined;
      this.closeDiv = undefined;

      this.manipulationHammers = [];
      this.temporaryUIFunctions = {};
      this.temporaryEventFunctions = [];

      this.touchTime = 0;
      this.temporaryIds = { nodes: [], edges: [] };
      this.guiEnabled = false;
      this.inMode = false;
      this.selectedControlNode = undefined;

      this.options = {};
      this.defaultOptions = {
        enabled: false,
        initiallyActive: false,
        addNode: true,
        addEdge: true,
        editNode: undefined,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle: {
          shape: 'dot',
          size: 6,
          color: { background: '#ff0000', border: '#3c3c3c', highlight: { background: '#07f968', border: '#3c3c3c' } },
          borderWidth: 2,
          borderWidthSelected: 2
        }
      };
      util.extend(this.options, this.defaultOptions);

      this.body.emitter.on('destroy', function () {
        _this._clean();
      });
      this.body.emitter.on('_dataChanged', this._restore.bind(this));
      this.body.emitter.on('_resetData', this._restore.bind(this));
    }