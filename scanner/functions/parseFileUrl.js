function parseFileUrl(input) {
            const match = fileRegex.exec(input);
            const path = match[2];
            return makeUrl('file:', '', match[1] || '', '', isAbsolutePath(path) ? path : '/' + path);
        }