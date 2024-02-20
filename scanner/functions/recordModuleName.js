function recordModuleName() {
                importedFiles.push(getFileReference());
                markAsExternalModuleIfTopLevel();
            }