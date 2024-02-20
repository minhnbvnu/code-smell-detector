function getCompletionEntriesForRelativeModules(literalValue, scriptDirectory, compilerOptions, host, scriptPath, extensionOptions) {
            if (compilerOptions.rootDirs) {
                return getCompletionEntriesForDirectoryFragmentWithRootDirs(compilerOptions.rootDirs, literalValue, scriptDirectory, extensionOptions, compilerOptions, host, scriptPath);
            }
            else {
                return arrayFrom(getCompletionEntriesForDirectoryFragment(literalValue, scriptDirectory, extensionOptions, host, 
                /*moduleSpecifierIsRelative*/
                false, scriptPath).values());
            }
        }