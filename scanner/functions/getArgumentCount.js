function getArgumentCount(argumentsList, ignoreTrailingComma) {
            const listChildren = argumentsList.getChildren();
            let argumentCount = countWhere(listChildren, (arg) => arg.kind !== 27 /* CommaToken */);
            if (!ignoreTrailingComma && listChildren.length > 0 && last(listChildren).kind === 27 /* CommaToken */) {
                argumentCount++;
            }
            return argumentCount;
        }