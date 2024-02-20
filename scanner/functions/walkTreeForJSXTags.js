function walkTreeForJSXTags(node) {
            if (!(node.transformFlags & 2 /* ContainsJsx */))
                return void 0;
            return isJsxOpeningLikeElement(node) || isJsxFragment(node) ? node : forEachChild(node, walkTreeForJSXTags);
        }