function getCompletionEntriesForDirectoryFragmentWithRootDirs(rootDirs, fragment, scriptDirectory, extensionOptions, compilerOptions, host, exclude) {
            const basePath = compilerOptions.project || host.getCurrentDirectory();
            const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
            const baseDirectories = getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase);
            return flatMap(baseDirectories, (baseDirectory) => arrayFrom(getCompletionEntriesForDirectoryFragment(fragment, baseDirectory, extensionOptions, host, 
            /*moduleSpecifierIsRelative*/
            true, exclude).values()));
        }