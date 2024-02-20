function getRenameInfo(program, sourceFile, position, preferences) {
            const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
            if (nodeIsEligibleForRename(node)) {
                const renameInfo = getRenameInfoForNode(node, program.getTypeChecker(), sourceFile, program, preferences);
                if (renameInfo) {
                    return renameInfo;
                }
            }
            return getRenameInfoError(Diagnostics.You_cannot_rename_this_element);
        }