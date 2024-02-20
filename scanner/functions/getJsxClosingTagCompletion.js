function getJsxClosingTagCompletion(location, sourceFile) {
            const jsxClosingElement = findAncestor(location, (node) => {
                switch (node.kind) {
                    case 284 /* JsxClosingElement */:
                        return true;
                    case 43 /* SlashToken */:
                    case 31 /* GreaterThanToken */:
                    case 79 /* Identifier */:
                    case 208 /* PropertyAccessExpression */:
                        return false;
                    default:
                        return "quit";
                }
            });
            if (jsxClosingElement) {
                const hasClosingAngleBracket = !!findChildOfKind(jsxClosingElement, 31 /* GreaterThanToken */, sourceFile);
                const tagName = jsxClosingElement.parent.openingElement.tagName;
                const closingTag = tagName.getText(sourceFile);
                const fullClosingTag = closingTag + (hasClosingAngleBracket ? "" : ">");
                const replacementSpan = createTextSpanFromNode(jsxClosingElement.tagName);
                const entry = {
                    name: fullClosingTag,
                    kind: "class" /* classElement */,
                    kindModifiers: void 0,
                    sortText: SortText.LocationPriority
                };
                return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: false, optionalReplacementSpan: replacementSpan, entries: [entry] };
            }
            return;
        }