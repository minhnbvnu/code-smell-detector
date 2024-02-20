function* generateJsxChildren(node, getInvalidTextDiagnostic) {
                if (!length(node.children))
                    return;
                let memberOffset = 0;
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    const nameType = getNumberLiteralType(i - memberOffset);
                    const elem = getElaborationElementForJsxChild(child, nameType, getInvalidTextDiagnostic);
                    if (elem) {
                        yield elem;
                    }
                    else {
                        memberOffset++;
                    }
                }
            }