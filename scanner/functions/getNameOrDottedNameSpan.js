function getNameOrDottedNameSpan(fileName, startPos, _endPos) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const node = getTouchingPropertyName(sourceFile, startPos);
                if (node === sourceFile) {
                    return void 0;
                }
                switch (node.kind) {
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                    case 10 /* StringLiteral */:
                    case 95 /* FalseKeyword */:
                    case 110 /* TrueKeyword */:
                    case 104 /* NullKeyword */:
                    case 106 /* SuperKeyword */:
                    case 108 /* ThisKeyword */:
                    case 194 /* ThisType */:
                    case 79 /* Identifier */:
                        break;
                    default:
                        return void 0;
                }
                let nodeForStartPos = node;
                while (true) {
                    if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
                        nodeForStartPos = nodeForStartPos.parent;
                    }
                    else if (isNameOfModuleDeclaration(nodeForStartPos)) {
                        if (nodeForStartPos.parent.parent.kind === 264 /* ModuleDeclaration */ && nodeForStartPos.parent.parent.body === nodeForStartPos.parent) {
                            nodeForStartPos = nodeForStartPos.parent.parent.name;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
            }