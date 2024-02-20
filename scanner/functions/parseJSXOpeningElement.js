function parseJSXOpeningElement() {
        var name, attributes = [], selfClosing = false, origInJSXChild, origInJSXTag, marker = markerCreate();

        origInJSXChild = state.inJSXChild;
        origInJSXTag = state.inJSXTag;
        state.inJSXChild = false;
        state.inJSXTag = true;

        expect('<');

        name = parseJSXElementName();

        while (index < length &&
                lookahead.value !== '/' &&
                lookahead.value !== '>') {
            attributes.push(parseJSXAttribute());
        }

        state.inJSXTag = origInJSXTag;

        if (lookahead.value === '/') {
            expect('/');
            // Because advance() (called by lex() called by expect()) expects
            // there to be a valid token after >, it needs to know whether to
            // look for a standard JS token or an JSX text node
            state.inJSXChild = origInJSXChild;
            expect('>');
            selfClosing = true;
        } else {
            state.inJSXChild = true;
            expect('>');
        }
        return markerApply(marker, delegate.createJSXOpeningElement(name, attributes, selfClosing));
    }