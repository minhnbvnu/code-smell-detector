function mergePaths(url, base) {
            // If we're not a relative path, then we're an absolute path, and it doesn't matter what base is.
            if (!url.relativePath)
                return;
            normalizePath(base);
            // If the path is just a "/", then it was an empty path to begin with (remember, we're a relative
            // path).
            if (url.path === '/') {
                url.path = base.path;
            }
            else {
                // Resolution happens relative to the base path's directory, not the file.
                url.path = stripPathFilename(base.path) + url.path;
            }
            // If the base path is absolute, then our path is now absolute too.
            url.relativePath = base.relativePath;
        }