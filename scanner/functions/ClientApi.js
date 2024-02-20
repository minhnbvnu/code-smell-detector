function ClientApi() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        storyStore = _ref.storyStore;

    _classCallCheck(this, ClientApi);

    this.facade = void 0;
    this.storyStore = void 0;
    this.addons = void 0;
    this.onImportFnChanged = void 0;
    this.lastFileName = 0;
    this.setAddon = util_deprecate__WEBPACK_IMPORTED_MODULE_21___default()(function (addon) {
      _this.addons = Object.assign({}, _this.addons, addon);
    }, Object(ts_dedent__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      `setAddon` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-setaddon\n    "], ["\n      \\`setAddon\\` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-setaddon\n    "]))));

    this.addDecorator = function (decorator) {
      _this.facade.projectAnnotations.decorators.push(decorator);
    };

    this.clearDecorators = util_deprecate__WEBPACK_IMPORTED_MODULE_21___default()(function () {
      _this.facade.projectAnnotations.decorators = [];
    }, Object(ts_dedent__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      `clearDecorators` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-cleardecorators\n    "], ["\n      \\`clearDecorators\\` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-cleardecorators\n    "]))));

    this.addParameters = function (_ref2) {
      var globals = _ref2.globals,
          globalTypes = _ref2.globalTypes,
          parameters = _objectWithoutProperties(_ref2, _excluded);

      _this.facade.projectAnnotations.parameters = Object(_storybook_store__WEBPACK_IMPORTED_MODULE_26__[/* combineParameters */ "a"])(_this.facade.projectAnnotations.parameters, parameters);

      if (globals) {
        _this.facade.projectAnnotations.globals = Object.assign({}, _this.facade.projectAnnotations.globals, globals);
      }

      if (globalTypes) {
        _this.facade.projectAnnotations.globalTypes = Object.assign({}, _this.facade.projectAnnotations.globalTypes, Object(_storybook_store__WEBPACK_IMPORTED_MODULE_27__[/* normalizeInputTypes */ "a"])(globalTypes));
      }
    };

    this.addLoader = function (loader) {
      _this.facade.projectAnnotations.loaders.push(loader);
    };

    this.addArgs = function (args) {
      _this.facade.projectAnnotations.args = Object.assign({}, _this.facade.projectAnnotations.args, args);
    };

    this.addArgTypes = function (argTypes) {
      _this.facade.projectAnnotations.argTypes = Object.assign({}, _this.facade.projectAnnotations.argTypes, Object(_storybook_store__WEBPACK_IMPORTED_MODULE_27__[/* normalizeInputTypes */ "a"])(argTypes));
    };

    this.addArgsEnhancer = function (enhancer) {
      _this.facade.projectAnnotations.argsEnhancers.push(enhancer);
    };

    this.addArgTypesEnhancer = function (enhancer) {
      _this.facade.projectAnnotations.argTypesEnhancers.push(enhancer);
    };

    this.storiesOf = function (kind, m) {
      if (!kind && typeof kind !== 'string') {
        throw new Error('Invalid or missing kind provided for stories, should be a string');
      }

      if (!m) {
        _storybook_client_logger__WEBPACK_IMPORTED_MODULE_24__[/* logger */ "a"].warn("Missing 'module' parameter for story with a kind of '".concat(kind, "'. It will break your HMR"));
      }

      if (m) {
        var proto = Object.getPrototypeOf(m);

        if (proto.exports && proto.exports.default) {
          // FIXME: throw an error in SB6.0
          _storybook_client_logger__WEBPACK_IMPORTED_MODULE_24__[/* logger */ "a"].error("Illegal mix of CSF default export and storiesOf calls in a single file: ".concat(proto.i));
        }
      } // eslint-disable-next-line no-plusplus


      var baseFilename = m && m.id ? "".concat(m.id) : (_this.lastFileName++).toString();
      var fileName = baseFilename;
      var i = 1; // Deal with `storiesOf()` being called twice in the same file.
      // On HMR, `this.csfExports[fileName]` will be reset to `{}`, so an empty object is due
      // to this export, not a second call of `storiesOf()`.

      while (_this.facade.csfExports[fileName] && Object.keys(_this.facade.csfExports[fileName]).length > 0) {
        i += 1;
        fileName = "".concat(baseFilename, "-").concat(i);
      }

      if (m && m.hot && m.hot.accept) {
        // This module used storiesOf(), so when it re-runs on HMR, it will reload
        // itself automatically without us needing to look at our imports
        m.hot.accept();
        m.hot.dispose(function () {
          _this.facade.clearFilenameExports(fileName); // We need to update the importFn as soon as the module re-evaluates
          // (and calls storiesOf() again, etc). We could call `onImportFnChanged()`
          // at the end of every setStories call (somehow), but then we'd need to
          // debounce it somehow for initial startup. Instead, we'll take advantage of
          // the fact that the evaluation of the module happens immediately in the same tick


          setTimeout(function () {
            var _this$onImportFnChang;

            (_this$onImportFnChang = _this.onImportFnChanged) === null || _this$onImportFnChang === void 0 ? void 0 : _this$onImportFnChang.call(_this, {
              importFn: _this.importFn.bind(_this)
            });
          }, 0);
        });
      }

      var hasAdded = false;
      var api = {
        kind: kind.toString(),
        add: function add() {
          return api;
        },
        addDecorator: function addDecorator() {
          return api;
        },
        addLoader: function addLoader() {
          return api;
        },
        addParameters: function addParameters() {
          return api;
        }
      }; // apply addons

      Object.keys(_this.addons).forEach(function (name) {
        var addon = _this.addons[name];

        api[name] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          addon.apply(api, args);
          return api;
        };
      });
      var meta = {
        id: Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_25__["sanitize"])(kind),
        title: kind,
        decorators: [],
        loaders: [],
        parameters: {}
      }; // We map these back to a simple default export, even though we have type guarantees at this point

      _this.facade.csfExports[fileName] = {
        default: meta
      };
      var counter = 0;

      api.add = function (storyName, storyFn) {
        var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        hasAdded = true;

        if (typeof storyName !== 'string') {
          throw new Error("Invalid or missing storyName provided for a \"".concat(kind, "\" story."));
        }

        if (!storyFn || Array.isArray(storyFn) || invalidStoryTypes.has(_typeof(storyFn))) {
          throw new Error("Cannot load story \"".concat(storyName, "\" in \"").concat(kind, "\" due to invalid format. Storybook expected a function/object but received ").concat(_typeof(storyFn), " instead."));
        }

        var decorators = parameters.decorators,
            loaders = parameters.loaders,
            component = parameters.component,
            args = parameters.args,
            argTypes = parameters.argTypes,
            storyParameters = _objectWithoutProperties(parameters, _excluded2); // eslint-disable-next-line no-underscore-dangle


        var storyId = parameters.__id || Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_25__["toId"])(kind, storyName);
        var csfExports = _this.facade.csfExports[fileName]; // Whack a _ on the front incase it is "default"

        csfExports["story".concat(counter)] = {
          name: storyName,
          parameters: Object.assign({
            fileName: fileName,
            __id: storyId
          }, storyParameters),
          decorators: decorators,
          loaders: loaders,
          args: args,
          argTypes: argTypes,
          component: component,
          render: storyFn
        };
        counter += 1;
        _this.facade.stories[storyId] = {
          id: storyId,
          title: csfExports.default.title,
          name: storyName,
          importPath: fileName
        };
        return api;
      };

      api.addDecorator = function (decorator) {
        if (hasAdded) throw new Error("You cannot add a decorator after the first story for a kind.\nRead more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md#can-no-longer-add-decoratorsparameters-after-stories");
        meta.decorators.push(decorator);
        return api;
      };

      api.addLoader = function (loader) {
        if (hasAdded) throw new Error("You cannot add a loader after the first story for a kind.");
        meta.loaders.push(loader);
        return api;
      };

      api.addParameters = function (_ref3) {
        var component = _ref3.component,
            args = _ref3.args,
            argTypes = _ref3.argTypes,
            parameters = _objectWithoutProperties(_ref3, _excluded3);

        if (hasAdded) throw new Error("You cannot add parameters after the first story for a kind.\nRead more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md#can-no-longer-add-decoratorsparameters-after-stories");
        meta.parameters = Object(_storybook_store__WEBPACK_IMPORTED_MODULE_26__[/* combineParameters */ "a"])(meta.parameters, parameters);
        if (component) meta.component = component;
        if (args) meta.args = Object.assign({}, meta.args, args);
        if (argTypes) meta.argTypes = Object.assign({}, meta.argTypes, argTypes);
        return api;
      };

      return api;
    };

    this.getStorybook = function () {
      var stories = _this.storyStore.storyIndex.stories;
      var kinds = {};
      Object.entries(stories).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            storyId = _ref5[0],
            _ref5$ = _ref5[1],
            title = _ref5$.title,
            name = _ref5$.name,
            importPath = _ref5$.importPath;

        if (!kinds[title]) {
          kinds[title] = {
            kind: title,
            fileName: importPath,
            stories: []
          };
        }

        var _this$storyStore$from = _this.storyStore.fromId(storyId),
            storyFn = _this$storyStore$from.storyFn;

        kinds[title].stories.push({
          name: name,
          render: storyFn
        });
      });
      return Object.values(kinds);
    };

    this.raw = function () {
      return _this.storyStore.raw();
    };

    this.facade = new _StoryStoreFacade__WEBPACK_IMPORTED_MODULE_28__[/* StoryStoreFacade */ "a"]();
    this.addons = {};
    this.storyStore = storyStore;
    singleton = this;
  }