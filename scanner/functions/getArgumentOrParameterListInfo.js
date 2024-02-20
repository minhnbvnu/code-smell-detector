function getArgumentOrParameterListInfo(node, position, sourceFile) {
            const info = getArgumentOrParameterListAndIndex(node, sourceFile);
            if (!info)
                return void 0;
            const { list, argumentIndex } = info;
            const argumentCount = getArgumentCount(list, 
            /*ignoreTrailingComma*/
            isInString(sourceFile, position, node));
            if (argumentIndex !== 0) {
                Debug.assertLessThan(argumentIndex, argumentCount);
            }
            const argumentsSpan = getApplicableSpanForArguments(list, sourceFile);
            return { list, argumentIndex, argumentCount, argumentsSpan };
        }