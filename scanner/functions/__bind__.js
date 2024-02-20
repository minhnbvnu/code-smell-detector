function __bind__(object, fn)
        {
            return function(event) {
                return fn.apply(object, [event]);
            };
        }