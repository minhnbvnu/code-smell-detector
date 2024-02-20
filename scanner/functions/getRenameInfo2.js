function getRenameInfo2(fileName, position, preferences) {
                synchronizeHostData();
                return ts_Rename_exports.getRenameInfo(program, getValidSourceFile(fileName), position, preferences || {});
            }