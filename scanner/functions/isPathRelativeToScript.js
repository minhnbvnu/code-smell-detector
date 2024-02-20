function isPathRelativeToScript(path) {
            if (path && path.length >= 2 && path.charCodeAt(0) === 46 /* dot */) {
                const slashIndex = path.length >= 3 && path.charCodeAt(1) === 46 /* dot */ ? 2 : 1;
                const slashCharCode = path.charCodeAt(slashIndex);
                return slashCharCode === 47 /* slash */ || slashCharCode === 92 /* backslash */;
            }
            return false;
        }