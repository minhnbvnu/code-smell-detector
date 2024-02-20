function deleteNodeInList(changes, deletedNodesInLists, sourceFile, node) {
            const containingList = Debug.checkDefined(ts_formatting_exports.SmartIndenter.getContainingList(node, sourceFile));
            const index = indexOfNode(containingList, node);
            Debug.assert(index !== -1);
            if (containingList.length === 1) {
                deleteNode(changes, sourceFile, node);
                return;
            }
            Debug.assert(!deletedNodesInLists.has(node), "Deleting a node twice");
            deletedNodesInLists.add(node);
            changes.deleteRange(sourceFile, {
                pos: startPositionToDeleteNodeInList(sourceFile, node),
                end: index === containingList.length - 1 ? getAdjustedEndPosition(sourceFile, node, {}) : endPositionToDeleteNodeInList(sourceFile, node, containingList[index - 1], containingList[index + 1])
            });
        }