function isInJSXContent(node) {
            return isStringLiteralJsxAttribute(node) || (isJsxElement(node) || isJsxSelfClosingElement(node) || isJsxFragment(node)) && (isJsxElement(node.parent) || isJsxFragment(node.parent));
        }