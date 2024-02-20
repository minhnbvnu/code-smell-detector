function doChange16(changes, sourceFile, { node, className }) {
            suppressLeadingAndTrailingTrivia(node);
            changes.replaceNode(sourceFile, node, factory.createPropertyAccessExpression(className ? factory.createIdentifier(className) : factory.createThis(), node));
        }