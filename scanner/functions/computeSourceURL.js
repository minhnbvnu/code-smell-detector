function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || '';
        if (sourceRoot) {
            // This follows what Chrome does.
            if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
                sourceRoot += '/';
            }
            // The spec says:
            //   Line 4: An optional source root, useful for relocating source
            //   files on a server or removing repeated values in the
            //   “sources” entry.  This value is prepended to the individual
            //   entries in the “source” field.
            sourceURL = sourceRoot + sourceURL;
        }
        // Historically, SourceMapConsumer did not take the sourceMapURL as
        // a parameter.  This mode is still somewhat supported, which is why
        // this code block is conditional.  However, it's preferable to pass
        // the source map URL to SourceMapConsumer, so that this function
        // can implement the source URL resolution algorithm as outlined in
        // the spec.  This block is basically the equivalent of:
        //    new URL(sourceURL, sourceMapURL).toString()
        // ... except it avoids using URL, which wasn't available in the
        // older releases of node still supported by this library.
        //
        // The spec says:
        //   If the sources are not absolute URLs after prepending of the
        //   “sourceRoot”, the sources are resolved relative to the
        //   SourceMap (like resolving script src in a html document).
        if (sourceMapURL) {
            var parsed = urlParse(sourceMapURL);
            if (!parsed) {
                throw new Error("sourceMapURL could not be parsed");
            }
            if (parsed.path) {
                // Strip the last path component, but keep the "/".
                var index = parsed.path.lastIndexOf('/');
                if (index >= 0) {
                    parsed.path = parsed.path.substring(0, index + 1);
                }
            }
            sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize(sourceURL);
    }