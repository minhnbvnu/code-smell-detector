function hasSupportedNumberOfArguments(node) {
            const name = node.expression.name.text;
            const maxArguments = name === "then" ? 2 : name === "catch" ? 1 : name === "finally" ? 1 : 0;
            if (node.arguments.length > maxArguments)
                return false;
            if (node.arguments.length < maxArguments)
                return true;
            return maxArguments === 1 || some(node.arguments, (arg) => {
                return arg.kind === 104 /* NullKeyword */ || isIdentifier(arg) && arg.text === "undefined";
            });
        }