function composeStory(storyAnnotations, componentAnnotations) {
  var _componentAnnotations, _storyAnnotations$sto;

  var projectAnnotations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : GLOBAL_STORYBOOK_PROJECT_ANNOTATIONS;
  var defaultConfig = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var exportsName = arguments.length > 4 ? arguments[4] : undefined;

  if (storyAnnotations === undefined) {
    throw new Error('Expected a story but received undefined.');
  } // @TODO: Support auto title
  // eslint-disable-next-line no-param-reassign


  componentAnnotations.title = (_componentAnnotations = componentAnnotations.title) !== null && _componentAnnotations !== void 0 ? _componentAnnotations : 'ComposedStory';
  var normalizedComponentAnnotations = Object(_normalizeComponentAnnotations__WEBPACK_IMPORTED_MODULE_19__[/* normalizeComponentAnnotations */ "a"])(componentAnnotations);
  var storyName = exportsName || storyAnnotations.storyName || ((_storyAnnotations$sto = storyAnnotations.story) === null || _storyAnnotations$sto === void 0 ? void 0 : _storyAnnotations$sto.name) || storyAnnotations.name;
  var normalizedStory = Object(_normalizeStory__WEBPACK_IMPORTED_MODULE_17__[/* normalizeStory */ "a"])(storyName, storyAnnotations, normalizedComponentAnnotations);
  var normalizedProjectAnnotations = Object(_normalizeProjectAnnotations__WEBPACK_IMPORTED_MODULE_21__[/* normalizeProjectAnnotations */ "a"])(Object.assign({}, projectAnnotations, defaultConfig));
  var story = Object(_prepareStory__WEBPACK_IMPORTED_MODULE_16__[/* prepareStory */ "a"])(normalizedStory, normalizedComponentAnnotations, normalizedProjectAnnotations);
  var defaultGlobals = Object(_getValuesFromArgTypes__WEBPACK_IMPORTED_MODULE_20__[/* getValuesFromArgTypes */ "a"])(projectAnnotations.globalTypes);

  var composedStory = function composedStory(extraArgs) {
    var context = Object.assign({}, story, {
      hooks: new _hooks__WEBPACK_IMPORTED_MODULE_18__[/* HooksContext */ "a"](),
      globals: defaultGlobals,
      args: Object.assign({}, story.initialArgs, extraArgs)
    });
    return story.unboundStoryFn(context);
  };

  composedStory.storyName = storyName;
  composedStory.args = story.initialArgs;
  composedStory.play = story.playFunction;
  composedStory.parameters = story.parameters;
  return composedStory;
}