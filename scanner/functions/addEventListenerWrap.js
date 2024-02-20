function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  var callback = external_window_ReactDOM_default.a.unstable_batchedUpdates ? function run(e) {
    external_window_ReactDOM_default.a.unstable_batchedUpdates(cb, e);
  } : cb;
  return _add_dom_event_listener_1_1_0_add_dom_event_listener_lib_default()(target, eventType, callback, option);
}