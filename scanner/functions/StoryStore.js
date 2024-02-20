function StoryStore() {
    var _this = this;

    _classCallCheck(this, StoryStore);

    this.storyIndex = void 0;
    this.importFn = void 0;
    this.projectAnnotations = void 0;
    this.globals = void 0;
    this.args = void 0;
    this.hooks = void 0;
    this.cachedCSFFiles = void 0;
    this.processCSFFileWithCache = void 0;
    this.prepareStoryWithCache = void 0;
    this.initializationPromise = void 0;
    this.resolveInitializationPromise = void 0;

    this.getStoriesJsonData = function () {
      var value = _this.getSetStoriesPayload();

      var allowedParameters = ['fileName', 'docsOnly', 'framework', '__id', '__isArgsStory'];
      var stories = lodash_mapValues__WEBPACK_IMPORTED_MODULE_22___default()(value.stories, function (story) {
        var _global$FEATURES;

        return Object.assign({}, lodash_pick__WEBPACK_IMPORTED_MODULE_23___default()(story, ['id', 'name', 'title']), {
          importPath: _this.storyIndex.stories[story.id].importPath
        }, !((_global$FEATURES = global__WEBPACK_IMPORTED_MODULE_24___default.a.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.breakingChangesV7) && {
          kind: story.title,
          story: story.name,
          parameters: Object.assign({}, lodash_pick__WEBPACK_IMPORTED_MODULE_23___default()(story.parameters, allowedParameters), {
            fileName: _this.storyIndex.stories[story.id].importPath
          })
        });
      });
      return {
        v: 3,
        stories: stories
      };
    };

    this.globals = new _GlobalsStore__WEBPACK_IMPORTED_MODULE_28__[/* GlobalsStore */ "a"]();
    this.args = new _ArgsStore__WEBPACK_IMPORTED_MODULE_27__[/* ArgsStore */ "a"]();
    this.hooks = {}; // We use a cache for these two functions for two reasons:
    //  1. For performance
    //  2. To ensure that when the same story is prepared with the same inputs you get the same output

    this.processCSFFileWithCache = memoizerific__WEBPACK_IMPORTED_MODULE_21___default()(CSF_CACHE_SIZE)(_csf__WEBPACK_IMPORTED_MODULE_29__[/* processCSFFile */ "a"]);
    this.prepareStoryWithCache = memoizerific__WEBPACK_IMPORTED_MODULE_21___default()(STORY_CACHE_SIZE)(_csf__WEBPACK_IMPORTED_MODULE_30__[/* prepareStory */ "a"]); // We cannot call `loadStory()` until we've been initialized properly. But we can wait for it.

    this.initializationPromise = new synchronous_promise__WEBPACK_IMPORTED_MODULE_25__["SynchronousPromise"](function (resolve) {
      _this.resolveInitializationPromise = resolve;
    });
  }