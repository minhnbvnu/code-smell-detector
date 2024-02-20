function castTuple(node, type, options) {
            var result, i, i$, ref$, len$, types, cast;
            if (toString$.call(node).slice(8, -1) !== 'Array') {
                return {
                    type: 'Nothing'
                };
            }
            result = [];
            i = 0;
            for (i$ = 0, len$ = (ref$ = type.of).length; i$ < len$; ++i$) {
                types = ref$[i$];
                cast = typesCast(node[i], types, options);
                if (toString$.call(cast).slice(8, -1) !== 'Undefined') {
                    result.push(cast);
                }
                i++;
            }
            if (node.length <= i) {
                return {
                    type: 'Just',
                    value: result
                };
            }
            else {
                return {
                    type: 'Nothing'
                };
            }
        }