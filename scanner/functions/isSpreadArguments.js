function isSpreadArguments(superArgs) {
        return (superArgs.length === 1 &&
            superArgs[0].type === "SpreadElement" &&
            superArgs[0].argument.type === "Identifier" &&
            superArgs[0].argument.name === "arguments");
    }