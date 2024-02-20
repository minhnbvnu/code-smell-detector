function destructuringNeedsFlattening(node) {
                if (isObjectLiteralExpression(node)) {
                    for (const elem of node.properties) {
                        switch (elem.kind) {
                            case 299 /* PropertyAssignment */:
                                if (destructuringNeedsFlattening(elem.initializer)) {
                                    return true;
                                }
                                break;
                            case 300 /* ShorthandPropertyAssignment */:
                                if (destructuringNeedsFlattening(elem.name)) {
                                    return true;
                                }
                                break;
                            case 301 /* SpreadAssignment */:
                                if (destructuringNeedsFlattening(elem.expression)) {
                                    return true;
                                }
                                break;
                            case 171 /* MethodDeclaration */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                return false;
                            default:
                                Debug.assertNever(elem, "Unhandled object member kind");
                        }
                    }
                }
                else if (isArrayLiteralExpression(node)) {
                    for (const elem of node.elements) {
                        if (isSpreadElement(elem)) {
                            if (destructuringNeedsFlattening(elem.expression)) {
                                return true;
                            }
                        }
                        else if (destructuringNeedsFlattening(elem)) {
                            return true;
                        }
                    }
                }
                else if (isIdentifier(node)) {
                    return length(getExports(node)) > (isExportName(node) ? 1 : 0);
                }
                return false;
            }