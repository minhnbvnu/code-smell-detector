function parseJSXClosingElement() {
        var name, origInJSXChild, origInJSXTag, marker = markerCreate();
        origInJSXChild = state.inJSXChild;
        origInJSXTag = state.inJSXTag;
        state.inJSXChild = false;
        state.inJSXTag = true;
        expect('<');
        expect('/');
        name = parseJSXElementName();
        // Because advance() (called by lex() called by expect()) expects there
        // to be a valid token after >, it needs to know whether to look for a
        // standard JS token or an JSX text node
        state.inJSXChild = origInJSXChild;
        state.inJSXTag = origInJSXTag;
        expect('>');
        return markerApply(marker, delegate.createJSXClosingElement(name));
    }