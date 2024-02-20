function doChange29(changeTracker, sf, node) {
            const jsx = flattenInvalidBinaryExpr(node);
            if (jsx)
                changeTracker.replaceNode(sf, node, factory.createJsxFragment(factory.createJsxOpeningFragment(), jsx, factory.createJsxJsxClosingFragment()));
        }