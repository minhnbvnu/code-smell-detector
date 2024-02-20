function StoryIndexStore() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      v: 3,
      stories: {}
    },
        stories = _ref.stories;

    _classCallCheck(this, StoryIndexStore);

    this.channel = void 0;
    this.stories = void 0;
    this.stories = stories;
  }