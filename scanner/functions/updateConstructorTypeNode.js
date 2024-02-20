function updateConstructorTypeNode(...args) {
                return args.length === 5 ? updateConstructorTypeNode1(...args) : args.length === 4 ? updateConstructorTypeNode2(...args) : Debug.fail("Incorrect number of arguments specified.");
            }