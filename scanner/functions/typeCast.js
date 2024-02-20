function typeCast(node, typeObj, options) {
            var type, structure, castFunc, ref$;
            type = typeObj.type, structure = typeObj.structure;
            if (type) {
                castFunc = ((ref$ = options.customTypes[type]) != null ? ref$.cast : void 8) || types[type];
                if (!castFunc) {
                    throw new Error("Type not defined: " + type + ".");
                }
                return castFunc(node, options, typesCast);
            }
            else {
                switch (structure) {
                    case 'array':
                        return castArray(node, typeObj, options);
                    case 'tuple':
                        return castTuple(node, typeObj, options);
                    case 'fields':
                        return castFields(node, typeObj, options);
                }
            }
        }