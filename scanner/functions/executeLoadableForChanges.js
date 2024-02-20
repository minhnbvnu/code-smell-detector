function executeLoadableForChanges(loadable, m) {
  var _m$hot, _m$hot$data, _m$hot2;

  var lastExportsMap = (m === null || m === void 0 ? void 0 : (_m$hot = m.hot) === null || _m$hot === void 0 ? void 0 : (_m$hot$data = _m$hot.data) === null || _m$hot$data === void 0 ? void 0 : _m$hot$data.lastExportsMap) || new Map();

  if (m !== null && m !== void 0 && (_m$hot2 = m.hot) !== null && _m$hot2 !== void 0 && _m$hot2.dispose) {
    m.hot.accept();
    m.hot.dispose(function (data) {
      // eslint-disable-next-line no-param-reassign
      data.lastExportsMap = lastExportsMap;
    });
  }

  var exportsMap = executeLoadable(loadable);
  var added = new Map();
  Array.from(exportsMap.entries()) // Ignore files that do not have a default export
  .filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fileExports = _ref2[1];

    return !!fileExports.default;
  }) // Ignore exports that are equal (by reference) to last time, this means the file hasn't changed
  .filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        fileName = _ref4[0],
        fileExports = _ref4[1];

    return lastExportsMap.get(fileName) !== fileExports;
  }).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        fileName = _ref6[0],
        fileExports = _ref6[1];

    return added.set(fileName, fileExports);
  });
  var removed = new Map();
  Array.from(lastExportsMap.keys()).filter(function (fileName) {
    return !exportsMap.has(fileName);
  }).forEach(function (fileName) {
    return removed.set(fileName, lastExportsMap.get(fileName));
  }); // Save the value for the dispose() call above

  lastExportsMap = exportsMap;
  return {
    added: added,
    removed: removed
  };
}