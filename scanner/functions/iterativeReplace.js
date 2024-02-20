function iterativeReplace(value, regexp, replacementFnc) {
                var evaluatedValue = value;
                do {
                    value = evaluatedValue.toString();
                    evaluatedValue = value.replace(regexp, replacementFnc);
                } while (value !== evaluatedValue);
                return evaluatedValue;
            }