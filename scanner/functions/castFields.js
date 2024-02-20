function castFields(node, type, options) {
            var typeOf, key, value;
            if (toString$.call(node).slice(8, -1) !== 'Object') {
                return {
                    type: 'Nothing'
                };
            }
            typeOf = type.of;
            return {
                type: 'Just',
                value: (function () {
                    var ref$, resultObj$ = {};
                    for (key in ref$ = node) {
                        value = ref$[key];
                        resultObj$[typesCast(key, [{
                                type: 'String'
                            }], options)] = typesCast(value, typeOf[key] || [{
                                type: '*'
                            }], options);
                    }
                    return resultObj$;
                }())
            };
        }