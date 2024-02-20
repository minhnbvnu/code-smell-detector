function updateCachedFileList(tsconfigPath, program, parseSettings) {
        const fileList = parseSettings.EXPERIMENTAL_useSourceOfProjectReferenceRedirect
            ? new Set(program.getSourceFiles().map(sf => (0, shared_1.getCanonicalFileName)(sf.fileName)))
            : new Set(program.getRootFileNames().map(f => (0, shared_1.getCanonicalFileName)(f)));
        programFileListCache.set(tsconfigPath, fileList);
        return fileList;
    }