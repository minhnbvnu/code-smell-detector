function iterationDecorator(collection, entries) {
      if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
        Object.defineProperty(collection, Symbol.iterator, {
          value: _iteratorProxy.default.bind(entries)
        });
      }
      return collection;
    }