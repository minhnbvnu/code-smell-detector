function isApplicable(node) {
                return (isKeyTypeNode(node) &&
                    node.typeAnnotation.loc.start.line === node.loc.end.line);
            }