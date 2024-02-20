function isNotShadowedByDeeperNodeModulesPackage(info, packageName) {
                if (!packageName || !info.moduleFileName)
                    return true;
                const typingsCacheLocation = host.getGlobalTypingsCacheLocation();
                if (typingsCacheLocation && startsWith(info.moduleFileName, typingsCacheLocation))
                    return true;
                const packageDeepestNodeModulesPath = packages.get(packageName);
                return !packageDeepestNodeModulesPath || startsWith(info.moduleFileName, packageDeepestNodeModulesPath);
            }