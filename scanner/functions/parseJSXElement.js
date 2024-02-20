function parseJSXElement() {
        var openingElement, closingElement = null, children = [], origInJSXChild, origInJSXTag, marker = markerCreate();

        origInJSXChild = state.inJSXChild;
        origInJSXTag = state.inJSXTag;
        openingElement = parseJSXOpeningElement();

        if (!openingElement.selfClosing) {
            while (index < length) {
                state.inJSXChild = false; // Call lookahead2() with inJSXChild = false because </ should not be considered in the child
                if (lookahead.value === '<' && lookahead2().value === '/') {
                    break;
                }
                state.inJSXChild = true;
                children.push(parseJSXChild());
            }
            state.inJSXChild = origInJSXChild;
            state.inJSXTag = origInJSXTag;
            closingElement = parseJSXClosingElement();
            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
                throwError({}, Messages.ExpectedJSXClosingTag, getQualifiedJSXName(openingElement.name));
            }
        }

        // When (erroneously) writing two adjacent tags like
        //
        //     var x = <div>one</div><div>two</div>;
        //
        // the default error message is a bit incomprehensible. Since it's
        // rarely (never?) useful to write a less-than sign after an JSX
        // element, we disallow it here in the parser in order to provide a
        // better error message. (In the rare case that the less-than operator
        // was intended, the left tag can be wrapped in parentheses.)
        if (!origInJSXChild && match('<')) {
            throwError(lookahead, Messages.AdjacentJSXElements);
        }

        return markerApply(marker, delegate.createJSXElement(openingElement, closingElement, children));
    }