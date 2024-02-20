function bindSourceFileAsExternalModule() {
                bindAnonymousDeclaration(file, 512 /* ValueModule */, `"${removeFileExtension(file.fileName)}"`);
            }