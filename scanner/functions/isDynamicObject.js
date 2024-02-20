function isDynamicObject(object) {
                if (typeof object !== 'object' || isArrayLike(object)) {
                    return;
                }
                var props = Object.keys(object);
                for (var i = 0; i < props.length; ++i) {
                    if (dynamic.isDynamic(object[props[i]])) {
                        return true;
                    }
                }
                return false;
            }