function getOptionalReplacementSpan(location) {
            return (location == null ? void 0 : location.kind) === 79 /* Identifier */ ? createTextSpanFromNode(location) : void 0;
        }