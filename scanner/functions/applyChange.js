function applyChange(changeTracker, initializer, sourceFile, fixedNodes) {
            if (!fixedNodes || tryAddToSet(fixedNodes, initializer)) {
                changeTracker.insertModifierBefore(sourceFile, 85 /* ConstKeyword */, initializer);
            }
        }