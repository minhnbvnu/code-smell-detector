function getDeclareFilePath(fname) {
        return isSTRFile(fname) ? changePathToDSTR(fname) : isTSFile(fname) ? changePathToDTS(fname) : changePathToDTS(fname);
    }