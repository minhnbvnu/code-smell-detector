function checkTuple(input, type, options) {
            var i, i$, ref$, len$, types;
            i = 0;
            for (i$ = 0, len$ = (ref$ = type.of).length; i$ < len$; ++i$) {
                types = ref$[i$];
                if (!checkMultiple(input[i], types, options)) {
                    return false;
                }
                i++;
            }
            return input.length <= i;
        }