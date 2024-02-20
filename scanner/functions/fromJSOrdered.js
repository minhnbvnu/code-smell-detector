function fromJSOrdered(js) {
                if (isImmutable(js)) return js;
                if (js instanceof _window2.default.File) return js;
                return !isObject(js) ? js : Array.isArray(js) ? _immutable2.default.Seq(js).map(fromJSOrdered).toList() : _immutable2.default.OrderedMap(js).map(fromJSOrdered)
            }