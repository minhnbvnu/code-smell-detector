function getImplicitImport(comment) {
        var implicitImportRegEx = /^(\/\/\/\s*<implicit-import\s*)*\/>/igm;
        var match = implicitImportRegEx.exec(comment);
        if(match) {
            return true;
        }
        return false;
    }