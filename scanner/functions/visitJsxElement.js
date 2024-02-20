function visitJsxElement(node, isChild) {
                const tagTransform = shouldUseCreateElement(node.openingElement) ? visitJsxOpeningLikeElementCreateElement : visitJsxOpeningLikeElementJSX;
                return tagTransform(node.openingElement, node.children, isChild, 
                /*location*/
                node);
            }