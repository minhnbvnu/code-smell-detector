function getLabelReferencesInNode(container, targetLabel) {
                        const sourceFile = container.getSourceFile();
                        const labelName = targetLabel.text;
                        const references = mapDefined(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), (node) => (
                        // Only pick labels that are either the target label, or have a target that is the target label
                        node === targetLabel || isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel ? nodeEntry(node) : void 0));
                        return [{ definition: { type: 1 /* Label */, node: targetLabel }, references }];
                    }