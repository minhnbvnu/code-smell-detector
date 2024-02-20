function EditorConcist(props) {
    _classCallCheck(this, EditorConcist);

    var _this = _possibleConstructorReturn(this, (EditorConcist.__proto__ || Object.getPrototypeOf(EditorConcist)).call(this, props));

    _this.state = {
      openFullTest: "",
      showSourceEditor: "",
      showURLInput: false,
      urlValue: '',
      hasPasted: false,
      autoSaveFun: null,
      visible: false,
      showMarkdownSource: false,
      tempSouceContent: "",
      language: "en",

      editorState: function () {
        var originalString = _this.props.importContent;
        originalString = !originalString ? " " : originalString;
        if (!originalString) {
          return _draftJs.EditorState.createEmpty(decorator);
        } else {
          var ConvertFormatProps = _this.props.convertFormat;
          var contentState = void 0;
          if (ConvertFormatProps === 'html') {
            contentState = (0, _utils.stateFromHTML)(originalString);
          } else if (ConvertFormatProps === 'markdown') {
            contentState = (0, _utils.stateFromMD)(originalString);
          } else if (ConvertFormatProps === 'raw') {
            originalString = originalString.replace(/\s/g, "") ? originalString : "{}";
            var rawContent = JSON.parse(originalString);
            if ((0, _isEmpty2.default)(rawContent)) {
              return _draftJs.EditorState.createWithContent("", decorator);
            }
            contentState = (0, _draftJs.convertFromRaw)(rawContent);
          }
          return _draftJs.EditorState.createWithContent(contentState, decorator);
        }
      }()
    };

    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      var that = _this;
      if (that.timer) {
        clearTimeout(that.timer);
      }
      that.timer = setTimeout(function () {
        var rawContentState = that.state.editorState.getCurrentContent();

        var content = void 0;
        var ConvertFormatProps = that.props.convertFormat;
        if (ConvertFormatProps === 'html') {
          content = (0, _utils.stateToHTML)(rawContentState);
        } else if (ConvertFormatProps === 'markdown') {
          content = (0, _utils.stateToMD)(rawContentState);
        } else if (ConvertFormatProps === 'raw') {
          var rawContent = (0, _draftJs.convertToRaw)(rawContentState);
          content = JSON.stringify(rawContent);
        }
        that.props.cbReceiver(content);
      }, 300);
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleAlignment = function (type) {
      return _this._toggleAlignment(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.customKeyBinding = _this._customKeyBinding.bind(_this);
    _this.handlePastedText = _this._handlePastedText.bind(_this);

    _this.logState = function () {
      var content = _this.state.editorState.getCurrentContent();
    };

    _this.addMedia = _this._addMedia.bind(_this);
    _this.addAudio = _this._addAudio.bind(_this);
    _this.addImage = _this._addImage.bind(_this);
    _this.addVideo = _this._addVideo.bind(_this);
    _this.undoRedo = _this._undoRedo.bind(_this);
    _this.removeStyle = _this._removeStyle.bind(_this);
    _this.pasteNoStyle = _this._pasteNoStyle.bind(_this);
    _this.choiceAutoSave = _this._choiceAutoSave.bind(_this);

    _this.toggleColor = function (toggledColor) {
      return _this._toggleColor(toggledColor);
    };

    _this.promptForLink = _this._promptForLink.bind(_this);
    _this.onURLChange = function (e) {
      return _this.setState({ urlValue: e.target.value });
    };
    _this.confirmLink = _this._confirmLink.bind(_this);
    _this.onLinkInputKeyDown = _this._onLinkInputKeyDown.bind(_this);
    _this.removeLink = _this._removeLink.bind(_this);
    _this.openFull = _this._openFull.bind(_this);
    _this.toggleSource = _this._toggleSource.bind(_this);
    _this.handleOk = _this.handleOk.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.solidHtml = _this._solidHtml.bind(_this);
    _this.changeMrakdownContent = _this._changeMrakdownContent.bind(_this);
    return _this;
  }