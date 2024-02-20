function validateIterable(iterable, iteratorFn) {
              {
                if (typeof Symbol === "function" && // $FlowFixMe Flow doesn't know about toStringTag
                iterable[Symbol.toStringTag] === "Generator") {
                  if (!didWarnAboutGenerators) {
                    error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                  }
                  didWarnAboutGenerators = true;
                }
                if (iterable.entries === iteratorFn) {
                  if (!didWarnAboutMaps) {
                    error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
            }