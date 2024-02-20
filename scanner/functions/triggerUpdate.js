function triggerUpdate() {
  var hooks = getHooksContextOrNull(); // Rerun storyFn if updates were triggered synchronously, force rerender otherwise

  if (hooks != null && hooks.currentPhase !== 'NONE') {
    hooks.hasUpdates = true;
  } else {
    try {
      _index__WEBPACK_IMPORTED_MODULE_23__[/* addons */ "c"].getChannel().emit(_storybook_core_events__WEBPACK_IMPORTED_MODULE_22__["FORCE_RE_RENDER"]);
    } catch (e) {
      _storybook_client_logger__WEBPACK_IMPORTED_MODULE_21__[/* logger */ "a"].warn('State updates of Storybook preview hooks work only in browser');
    }
  }
}