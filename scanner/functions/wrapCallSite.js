function wrapCallSite(frame, state) {
        // provides interface backward compatibility
        if (state === undefined) {
            state = { nextPosition: null, curPosition: null };
        }
        if (frame.isNative()) {
            state.curPosition = null;
            return frame;
        }
        // Most call sites will return the source file from getFileName(), but code
        // passed to eval() ending in "//# sourceURL=..." will return the source file
        // from getScriptNameOrSourceURL() instead
        var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
        if (source) {
            var line = frame.getLineNumber();
            var column = frame.getColumnNumber() - 1;
            // Fix position in Node where some (internal) code is prepended.
            // See https://github.com/evanw/node-source-map-support/issues/36
            // Header removed in node at ^10.16 || >=11.11.0
            // v11 is not an LTS candidate, we can just test the one version with it.
            // Test node versions for: 10.16-19, 10.20+, 12-19, 20-99, 100+, or 11.11
            var noHeader = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/;
            var headerLength = noHeader.test(globalProcessVersion()) ? 0 : 62;
            if (line === 1 && column > headerLength && !isInBrowser() && !frame.isEval()) {
                column -= headerLength;
            }
            var position = mapSourcePosition({
                source: source,
                line: line,
                column: column
            });
            state.curPosition = position;
            frame = cloneCallSite(frame);
            var originalFunctionName = frame.getFunctionName;
            frame.getFunctionName = function () {
                if (state.nextPosition == null) {
                    return originalFunctionName();
                }
                return state.nextPosition.name || originalFunctionName();
            };
            frame.getFileName = function () { return position.source; };
            frame.getLineNumber = function () { return position.line; };
            frame.getColumnNumber = function () { return position.column + 1; };
            frame.getScriptNameOrSourceURL = function () { return position.source; };
            return frame;
        }
        // Code called using eval() needs special handling
        var origin = frame.isEval() && frame.getEvalOrigin();
        if (origin) {
            origin = mapEvalOrigin(origin);
            frame = cloneCallSite(frame);
            frame.getEvalOrigin = function () { return origin; };
            return frame;
        }
        // If we get here then we were unable to change the source position
        return frame;
    }