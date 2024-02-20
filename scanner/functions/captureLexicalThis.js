function captureLexicalThis(node, container) {
                getNodeLinks(node).flags |= 2 /* LexicalThis */;
                if (container.kind === 169 /* PropertyDeclaration */ || container.kind === 173 /* Constructor */) {
                    const classNode = container.parent;
                    getNodeLinks(classNode).flags |= 4 /* CaptureThis */;
                }
                else {
                    getNodeLinks(container).flags |= 4 /* CaptureThis */;
                }
            }