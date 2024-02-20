function checkFields(input, type, options) {
            var inputKeys, numInputKeys, k, numOfKeys, key, ref$, types;
            inputKeys = {};
            numInputKeys = 0;
            for (k in input) {
                inputKeys[k] = true;
                numInputKeys++;
            }
            numOfKeys = 0;
            for (key in ref$ = type.of) {
                types = ref$[key];
                if (!checkMultiple(input[key], types, options)) {
                    return false;
                }
                if (inputKeys[key]) {
                    numOfKeys++;
                }
            }
            return type.subset || numInputKeys === numOfKeys;
        }