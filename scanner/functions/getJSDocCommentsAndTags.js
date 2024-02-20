function getJSDocCommentsAndTags(hostNode, noCache) {
            let result;
            if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer)) {
                result = addRange(result, filterOwnedJSDocTags(hostNode, last(hostNode.initializer.jsDoc)));
            }
            let node = hostNode;
            while (node && node.parent) {
                if (hasJSDocNodes(node)) {
                    result = addRange(result, filterOwnedJSDocTags(hostNode, last(node.jsDoc)));
                }
                if (node.kind === 166 /* Parameter */) {
                    result = addRange(result, (noCache ? getJSDocParameterTagsNoCache : getJSDocParameterTags)(node));
                    break;
                }
                if (node.kind === 165 /* TypeParameter */) {
                    result = addRange(result, (noCache ? getJSDocTypeParameterTagsNoCache : getJSDocTypeParameterTags)(node));
                    break;
                }
                node = getNextJSDocCommentLocation(node);
            }
            return result || emptyArray;
        }