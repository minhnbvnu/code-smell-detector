function getRelativePathToDirectoryOrUrl(directoryPathOrUrl, relativeOrAbsolutePath, currentDirectory, getCanonicalFileName, isAbsolutePathAnUrl) {
            const pathComponents2 = getPathComponentsRelativeTo(resolvePath(currentDirectory, directoryPathOrUrl), resolvePath(currentDirectory, relativeOrAbsolutePath), equateStringsCaseSensitive, getCanonicalFileName);
            const firstComponent = pathComponents2[0];
            if (isAbsolutePathAnUrl && isRootedDiskPath(firstComponent)) {
                const prefix = firstComponent.charAt(0) === directorySeparator ? "file://" : "file:///";
                pathComponents2[0] = prefix + firstComponent;
            }
            return getPathFromPathComponents(pathComponents2);
        }