function useArgs() {
  var channel = _index__WEBPACK_IMPORTED_MODULE_23__[/* addons */ "c"].getChannel();

  var _useStoryContext2 = useStoryContext(),
      storyId = _useStoryContext2.id,
      args = _useStoryContext2.args;

  var updateArgs = useCallback(function (updatedArgs) {
    return channel.emit(_storybook_core_events__WEBPACK_IMPORTED_MODULE_22__["UPDATE_STORY_ARGS"], {
      storyId: storyId,
      updatedArgs: updatedArgs
    });
  }, [channel, storyId]);
  var resetArgs = useCallback(function (argNames) {
    return channel.emit(_storybook_core_events__WEBPACK_IMPORTED_MODULE_22__["RESET_STORY_ARGS"], {
      storyId: storyId,
      argNames: argNames
    });
  }, [channel, storyId]);
  return [args, updateArgs, resetArgs];
}