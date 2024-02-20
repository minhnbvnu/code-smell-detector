function StoryStoreFacade() {
    _classCallCheck(this, StoryStoreFacade);

    this.projectAnnotations = void 0;
    this.stories = void 0;
    this.csfExports = void 0;
    this.projectAnnotations = {
      loaders: [],
      decorators: [],
      parameters: {},
      argsEnhancers: [],
      argTypesEnhancers: [],
      args: {},
      argTypes: {}
    };
    this.stories = {};
    this.csfExports = {};
  }