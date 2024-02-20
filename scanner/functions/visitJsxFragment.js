function visitJsxFragment(node, isChild) {
                const tagTransform = currentFileState.importSpecifier === void 0 ? visitJsxOpeningFragmentCreateElement : visitJsxOpeningFragmentJSX;
                return tagTransform(node.openingFragment, node.children, isChild, 
                /*location*/
                node);
            }