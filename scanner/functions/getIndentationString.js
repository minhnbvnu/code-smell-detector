function getIndentationString(indentation, options) {
            const resetInternedStrings = !internedSizes || (internedSizes.tabSize !== options.tabSize || internedSizes.indentSize !== options.indentSize);
            if (resetInternedStrings) {
                internedSizes = { tabSize: options.tabSize, indentSize: options.indentSize };
                internedTabsIndentation = internedSpacesIndentation = void 0;
            }
            if (!options.convertTabsToSpaces) {
                const tabs = Math.floor(indentation / options.tabSize);
                const spaces = indentation - tabs * options.tabSize;
                let tabString;
                if (!internedTabsIndentation) {
                    internedTabsIndentation = [];
                }
                if (internedTabsIndentation[tabs] === void 0) {
                    internedTabsIndentation[tabs] = tabString = repeatString("	", tabs);
                }
                else {
                    tabString = internedTabsIndentation[tabs];
                }
                return spaces ? tabString + repeatString(" ", spaces) : tabString;
            }
            else {
                let spacesString;
                const quotient = Math.floor(indentation / options.indentSize);
                const remainder = indentation % options.indentSize;
                if (!internedSpacesIndentation) {
                    internedSpacesIndentation = [];
                }
                if (internedSpacesIndentation[quotient] === void 0) {
                    spacesString = repeatString(" ", options.indentSize * quotient);
                    internedSpacesIndentation[quotient] = spacesString;
                }
                else {
                    spacesString = internedSpacesIndentation[quotient];
                }
                return remainder ? spacesString + repeatString(" ", remainder) : spacesString;
            }
        }