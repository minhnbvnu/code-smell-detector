function validateArraySpacing(node) {
                if (options.spaced && node.elements.length === 0) {
                    return;
                }
                const first = sourceCode.getFirstToken(node), second = sourceCode.getFirstToken(node, 1), last = node.typeAnnotation
                    ? sourceCode.getTokenBefore(node.typeAnnotation)
                    : sourceCode.getLastToken(node), penultimate = sourceCode.getTokenBefore(last), firstElement = node.elements[0], lastElement = node.elements[node.elements.length - 1];
                const openingBracketMustBeSpaced = options.objectsInArraysException && isObjectType(firstElement) ||
                    options.arraysInArraysException && isArrayType(firstElement) ||
                    options.singleElementException && node.elements.length === 1
                    ? !options.spaced : options.spaced;
                const closingBracketMustBeSpaced = options.objectsInArraysException && isObjectType(lastElement) ||
                    options.arraysInArraysException && isArrayType(lastElement) ||
                    options.singleElementException && node.elements.length === 1
                    ? !options.spaced : options.spaced;
                if (astUtils.isTokenOnSameLine(first, second)) {
                    if (openingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(first, second)) {
                        reportRequiredBeginningSpace(node, first);
                    }
                    if (!openingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(first, second)) {
                        reportNoBeginningSpace(node, first);
                    }
                }
                if (first !== penultimate && astUtils.isTokenOnSameLine(penultimate, last)) {
                    if (closingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(penultimate, last)) {
                        reportRequiredEndingSpace(node, last);
                    }
                    if (!closingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(penultimate, last)) {
                        reportNoEndingSpace(node, last);
                    }
                }
            }