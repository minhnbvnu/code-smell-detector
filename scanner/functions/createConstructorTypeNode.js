function createConstructorTypeNode(...args) {
                return args.length === 4 ? createConstructorTypeNode1(...args) : args.length === 3 ? createConstructorTypeNode2(...args) : Debug.fail("Incorrect number of arguments specified.");
            }