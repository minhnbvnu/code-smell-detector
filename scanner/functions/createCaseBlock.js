function createCaseBlock(clauses) {
                const node = createBaseNode(266 /* CaseBlock */);
                node.clauses = createNodeArray(clauses);
                node.transformFlags |= propagateChildrenFlags(node.clauses);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }