function getCompletionEntriesFromDirectories(directory) {
                if (!tryDirectoryExists(host, directory))
                    return;
                for (const typeDirectoryName of tryGetDirectories(host, directory)) {
                    const packageName = unmangleScopedPackageName(typeDirectoryName);
                    if (options.types && !contains(options.types, packageName))
                        continue;
                    if (fragmentDirectory === void 0) {
                        if (!seen.has(packageName)) {
                            result.add(nameAndKind(packageName, "external module name" /* externalModuleName */, 
                            /*extension*/
                            void 0));
                            seen.set(packageName, true);
                        }
                    }
                    else {
                        const baseDirectory = combinePaths(directory, typeDirectoryName);
                        const remainingFragment = tryRemoveDirectoryPrefix(fragmentDirectory, packageName, hostGetCanonicalFileName(host));
                        if (remainingFragment !== void 0) {
                            getCompletionEntriesForDirectoryFragment(remainingFragment, baseDirectory, extensionOptions, host, 
                            /*moduleSpecifierIsRelative*/
                            false, 
                            /*exclude*/
                            void 0, result);
                        }
                    }
                }
            }