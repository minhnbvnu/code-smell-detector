function unpatchForStrictMode() {
  if (react_devtools_feature_flags__WEBPACK_IMPORTED_MODULE_3__[/* consoleManagedByDevToolsDuringStrictMode */ "a"]) {
    if (unpatchForStrictModeFn !== null) {
      unpatchForStrictModeFn();
      unpatchForStrictModeFn = null;
    }
  }
}