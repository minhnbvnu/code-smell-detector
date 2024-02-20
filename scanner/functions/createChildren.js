function createChildren(node, sourceFile) {
            if (!isNodeKind(node.kind)) {
                return emptyArray;
            }
            const children = [];
            if (isJSDocCommentContainingNode(node)) {
                node.forEachChild((child) => {
                    children.push(child);
                });
                return children;
            }
            scanner.setText((sourceFile || node.getSourceFile()).text);
            let pos = node.pos;
            const processNode = (child) => {
                addSyntheticNodes(children, pos, child.pos, node);
                children.push(child);
                pos = child.end;
            };
            const processNodes = (nodes) => {
                addSyntheticNodes(children, pos, nodes.pos, node);
                children.push(createSyntaxList(nodes, node));
                pos = nodes.end;
            };
            forEach(node.jsDoc, processNode);
            pos = node.pos;
            node.forEachChild(processNode, processNodes);
            addSyntheticNodes(children, pos, node.end, node);
            scanner.setText(void 0);
            return children;
        }