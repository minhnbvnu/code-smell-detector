function visitJsxOpeningLikeElementJSX(node, children, isChild, location) {
                const tagName = getTagName(node);
                const childrenProp = children && children.length ? convertJsxChildrenToChildrenPropAssignment(children) : void 0;
                const keyAttr = find(node.attributes.properties, (p) => !!p.name && isIdentifier(p.name) && p.name.escapedText === "key");
                const attrs = keyAttr ? filter(node.attributes.properties, (p) => p !== keyAttr) : node.attributes.properties;
                const objectProperties = length(attrs) ? transformJsxAttributesToObjectProps(attrs, childrenProp) : factory2.createObjectLiteralExpression(childrenProp ? [childrenProp] : emptyArray);
                return visitJsxOpeningLikeElementOrFragmentJSX(tagName, objectProperties, keyAttr, children || emptyArray, isChild, location);
            }