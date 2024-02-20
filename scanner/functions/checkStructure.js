function checkStructure(input, type, options) {
            if (!(input instanceof Object)) {
                return false;
            }
            switch (type.structure) {
                case 'fields':
                    return checkFields(input, type, options);
                case 'array':
                    return checkArray(input, type, options);
                case 'tuple':
                    return checkTuple(input, type, options);
            }
        }