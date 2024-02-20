function visitJsxSelfClosingElement(node, isChild) {
                const tagTransform = shouldUseCreateElement(node) ? visitJsxOpeningLikeElementCreateElement : visitJsxOpeningLikeElementJSX;
                return tagTransform(node, 
                /*children*/
                void 0, isChild, 
                /*location*/
                node);
            }