function flattenHooksList(hooksTree) {
  const hooksList = [];
  Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('flattenHooksList()', () => {
    flattenHooksListImpl(hooksTree, hooksList);
  });

  if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
    console.log('flattenHooksList() hooksList:', hooksList);
  }

  return hooksList;
}