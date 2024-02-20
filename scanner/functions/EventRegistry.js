function EventRegistry () {
      var registry = {};
      var registerId = function (extraArgs, id, events) {
        each(events, function (v, k) {
          var handlers = registry[k] !== undefined ? registry[k] : {};
          handlers[id] = curryArgs(v, extraArgs);
          registry[k] = handlers;
        });
      };
      var findHandler = function (handlers, elem) {
        return read$2(elem).fold(function () {
          return Option.none();
        }, function (id) {
          return handlers.bind(function (h) {
            return get(h, id);
          }).map(function (descHandler) {
            return eventHandler(elem, descHandler);
          });
        });
      };
      var filterByType = function (type) {
        return get(registry, type).map(function (handlers) {
          return mapToArray(handlers, function (f, id) {
            return broadcastHandler(id, f);
          });
        }).getOr([]);
      };
      var find = function (isAboveRoot, type, target) {
        var handlers = get(registry, type);
        return closest(target, function (elem) {
          return findHandler(handlers, elem);
        }, isAboveRoot);
      };
      var unregisterId = function (id) {
        each(registry, function (handlersById, _eventName) {
          if (handlersById.hasOwnProperty(id)) {
            delete handlersById[id];
          }
        });
      };
      return {
        registerId: registerId,
        unregisterId: unregisterId,
        filterByType: filterByType,
        find: find
      };
    }