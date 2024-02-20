function spanForJSXAttributes(node) {
                if (node.properties.length === 0) {
                    return void 0;
                }
                return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), "code" /* Code */);
            }