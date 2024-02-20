function spanForTemplateLiteral(node) {
                if (node.kind === 14 /* NoSubstitutionTemplateLiteral */ && node.text.length === 0) {
                    return void 0;
                }
                return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), "code" /* Code */);
            }