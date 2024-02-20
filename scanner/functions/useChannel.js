function useChannel(eventMap) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var channel = _index__WEBPACK_IMPORTED_MODULE_23__[/* addons */ "c"].getChannel();
  useEffect(function () {
    Object.entries(eventMap).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          type = _ref4[0],
          listener = _ref4[1];

      return channel.on(type, listener);
    });
    return function () {
      Object.entries(eventMap).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            type = _ref6[0],
            listener = _ref6[1];

        return channel.removeListener(type, listener);
      });
    };
  }, [].concat(_toConsumableArray(Object.keys(eventMap)), _toConsumableArray(deps)));
  return useCallback(channel.emit.bind(channel), [channel]);
}