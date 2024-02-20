function getSymlinkCache() {
                if (host.getSymlinkCache) {
                    return host.getSymlinkCache();
                }
                if (!symlinks) {
                    symlinks = createSymlinkCache(currentDirectory, getCanonicalFileName);
                }
                if (files && automaticTypeDirectiveResolutions && !symlinks.hasProcessedResolutions()) {
                    symlinks.setSymlinksFromResolutions(files, automaticTypeDirectiveResolutions);
                }
                return symlinks;
            }