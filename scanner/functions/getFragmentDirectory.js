function getFragmentDirectory(fragment) {
            return containsSlash(fragment) ? hasTrailingDirectorySeparator(fragment) ? fragment : getDirectoryPath(fragment) : void 0;
        }