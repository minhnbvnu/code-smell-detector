function useGlobals() {
  var channel = _index__WEBPACK_IMPORTED_MODULE_23__[/* addons */ "c"].getChannel();

  var _useStoryContext3 = useStoryContext(),
      globals = _useStoryContext3.globals;

  var updateGlobals = useCallback(function (newGlobals) {
    return channel.emit(_storybook_core_events__WEBPACK_IMPORTED_MODULE_22__["UPDATE_GLOBALS"], {
      globals: newGlobals
    });
  }, [channel]);
  return [globals, updateGlobals];
}