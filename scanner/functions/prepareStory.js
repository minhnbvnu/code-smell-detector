function prepareStory(storyAnnotations, componentAnnotations, projectAnnotations) {
  var _global$FEATURES;

  // NOTE: in the current implementation we are doing everything once, up front, rather than doing
  // anything at render time. The assumption is that as we don't load all the stories at once, this
  // will have a limited cost. If this proves misguided, we can refactor it.
  var id = storyAnnotations.id,
      name = storyAnnotations.name;
  var title = componentAnnotations.title;
  var parameters = Object(_parameters__WEBPACK_IMPORTED_MODULE_23__[/* combineParameters */ "a"])(projectAnnotations.parameters, componentAnnotations.parameters, storyAnnotations.parameters);
  var decorators = [].concat(_toConsumableArray(storyAnnotations.decorators || []), _toConsumableArray(componentAnnotations.decorators || []), _toConsumableArray(projectAnnotations.decorators || [])); // Currently it is only possible to set these globally

  var _projectAnnotations$a = projectAnnotations.applyDecorators,
      applyDecorators = _projectAnnotations$a === void 0 ? _decorators__WEBPACK_IMPORTED_MODULE_25__[/* defaultDecorateStory */ "a"] : _projectAnnotations$a,
      _projectAnnotations$a2 = projectAnnotations.argTypesEnhancers,
      argTypesEnhancers = _projectAnnotations$a2 === void 0 ? [] : _projectAnnotations$a2,
      _projectAnnotations$a3 = projectAnnotations.argsEnhancers,
      argsEnhancers = _projectAnnotations$a3 === void 0 ? [] : _projectAnnotations$a3;
  var loaders = [].concat(_toConsumableArray(projectAnnotations.loaders || []), _toConsumableArray(componentAnnotations.loaders || []), _toConsumableArray(storyAnnotations.loaders || [])); // The render function on annotations *has* to be an `ArgsStoryFn`, so when we normalize
  // CSFv1/2, we use a new field called `userStoryFn` so we know that it can be a LegacyStoryFn

  var render = storyAnnotations.userStoryFn || storyAnnotations.render || componentAnnotations.render || projectAnnotations.render;
  var passedArgTypes = Object(_parameters__WEBPACK_IMPORTED_MODULE_23__[/* combineParameters */ "a"])(projectAnnotations.argTypes, componentAnnotations.argTypes, storyAnnotations.argTypes);
  var _parameters$passArgsF = parameters.passArgsFirst,
      passArgsFirst = _parameters$passArgsF === void 0 ? true : _parameters$passArgsF; // eslint-disable-next-line no-underscore-dangle

  parameters.__isArgsStory = passArgsFirst && render.length > 0; // Pull out args[X] into initialArgs for argTypes enhancers

  var passedArgs = Object.assign({}, projectAnnotations.args, componentAnnotations.args, storyAnnotations.args);
  var contextForEnhancers = {
    componentId: componentAnnotations.id,
    title: title,
    kind: title,
    // Back compat
    id: id,
    name: name,
    story: name,
    // Back compat
    component: componentAnnotations.component,
    subcomponents: componentAnnotations.subcomponents,
    parameters: parameters,
    initialArgs: passedArgs,
    argTypes: passedArgTypes
  };
  contextForEnhancers.argTypes = argTypesEnhancers.reduce(function (accumulatedArgTypes, enhancer) {
    return enhancer(Object.assign({}, contextForEnhancers, {
      argTypes: accumulatedArgTypes
    }));
  }, contextForEnhancers.argTypes); // Add argTypes[X].defaultValue to initial args (note this deprecated)
  // We need to do this *after* the argTypesEnhancers as they may add defaultValues

  var defaultArgs = Object(_getValuesFromArgTypes__WEBPACK_IMPORTED_MODULE_27__[/* getValuesFromArgTypes */ "a"])(contextForEnhancers.argTypes);

  if (Object.keys(defaultArgs).length > 0) {
    argTypeDefaultValueWarning();
  }

  var initialArgsBeforeEnhancers = Object.assign({}, defaultArgs, passedArgs);
  contextForEnhancers.initialArgs = argsEnhancers.reduce(function (accumulatedArgs, enhancer) {
    return Object.assign({}, accumulatedArgs, enhancer(Object.assign({}, contextForEnhancers, {
      initialArgs: accumulatedArgs
    })));
  }, initialArgsBeforeEnhancers); // Add some of our metadata into parameters as we used to do this in 6.x and users may be relying on it

  if (!((_global$FEATURES = global__WEBPACK_IMPORTED_MODULE_21___default.a.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.breakingChangesV7)) {
    contextForEnhancers.parameters = Object.assign({}, contextForEnhancers.parameters, {
      __id: id,
      globals: projectAnnotations.globals,
      globalTypes: projectAnnotations.globalTypes,
      args: contextForEnhancers.initialArgs,
      argTypes: contextForEnhancers.argTypes
    });
  }

  var applyLoaders = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context) {
      var loadResults, loaded;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all(loaders.map(function (loader) {
                return loader(context);
              }));

            case 2:
              loadResults = _context.sent;
              loaded = Object.assign.apply(Object, [{}].concat(_toConsumableArray(loadResults)));
              return _context.abrupt("return", Object.assign({}, context, {
                loaded: loaded
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function applyLoaders(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var undecoratedStoryFn = function undecoratedStoryFn(context) {
    var mappedArgs = Object.entries(context.args).reduce(function (acc, _ref2) {
      var _context$argTypes$key;

      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          val = _ref3[1];

      var mapping = (_context$argTypes$key = context.argTypes[key]) === null || _context$argTypes$key === void 0 ? void 0 : _context$argTypes$key.mapping;
      acc[key] = mapping && val in mapping ? mapping[val] : val;
      return acc;
    }, {});
    var includedArgs = Object.entries(mappedArgs).reduce(function (acc, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          val = _ref5[1];

      var argType = context.argTypes[key] || {};
      if (Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_22__["includeConditionalArg"])(argType, mappedArgs, context.globals)) acc[key] = val;
      return acc;
    }, {});
    var includedContext = Object.assign({}, context, {
      args: includedArgs
    });
    var _context$parameters$p = context.parameters.passArgsFirst,
        renderTimePassArgsFirst = _context$parameters$p === void 0 ? true : _context$parameters$p;
    return renderTimePassArgsFirst ? render(includedContext.args, includedContext) : render(includedContext);
  };

  var decoratedStoryFn = Object(_hooks__WEBPACK_IMPORTED_MODULE_24__[/* applyHooks */ "b"])(applyDecorators)(undecoratedStoryFn, decorators);

  var unboundStoryFn = function unboundStoryFn(context) {
    var _global$FEATURES2;

    var finalContext = context;

    if ((_global$FEATURES2 = global__WEBPACK_IMPORTED_MODULE_21___default.a.FEATURES) !== null && _global$FEATURES2 !== void 0 && _global$FEATURES2.argTypeTargetsV7) {
      var argsByTarget = Object(_args__WEBPACK_IMPORTED_MODULE_26__[/* groupArgsByTarget */ "e"])(Object.assign({
        args: context.args
      }, context));
      finalContext = Object.assign({}, context, {
        allArgs: context.args,
        argsByTarget: argsByTarget,
        args: argsByTarget[_args__WEBPACK_IMPORTED_MODULE_26__[/* NO_TARGET_NAME */ "b"]] || {}
      });
    }

    return decoratedStoryFn(finalContext);
  };

  var playFunction = storyAnnotations.play;
  return Object.freeze(Object.assign({}, contextForEnhancers, {
    originalStoryFn: render,
    undecoratedStoryFn: undecoratedStoryFn,
    unboundStoryFn: unboundStoryFn,
    applyLoaders: applyLoaders,
    playFunction: playFunction
  }));
}