function visitJsxOpeningFragmentJSX(_node, children, isChild, location) {
                let childrenProps;
                if (children && children.length) {
                    const result = convertJsxChildrenToChildrenPropObject(children);
                    if (result) {
                        childrenProps = result;
                    }
                }
                return visitJsxOpeningLikeElementOrFragmentJSX(getImplicitJsxFragmentReference(), childrenProps || factory2.createObjectLiteralExpression([]), 
                /*keyAttr*/
                void 0, children, isChild, location);
            }