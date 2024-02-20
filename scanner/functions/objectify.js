function objectify(thing) {
                if (!isObject(thing)) return {};
                if (isImmutable(thing)) return thing.toJS();
                return thing
            }