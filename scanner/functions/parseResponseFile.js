function parseResponseFile(fileName) {
                const text = tryReadFile(fileName, readFile || ((fileName2) => sys.readFile(fileName2)));
                if (!isString(text)) {
                    errors.push(text);
                    return;
                }
                const args = [];
                let pos = 0;
                while (true) {
                    while (pos < text.length && text.charCodeAt(pos) <= 32 /* space */)
                        pos++;
                    if (pos >= text.length)
                        break;
                    const start = pos;
                    if (text.charCodeAt(start) === 34 /* doubleQuote */) {
                        pos++;
                        while (pos < text.length && text.charCodeAt(pos) !== 34 /* doubleQuote */)
                            pos++;
                        if (pos < text.length) {
                            args.push(text.substring(start + 1, pos));
                            pos++;
                        }
                        else {
                            errors.push(createCompilerDiagnostic(Diagnostics.Unterminated_quoted_string_in_response_file_0, fileName));
                        }
                    }
                    else {
                        while (text.charCodeAt(pos) > 32 /* space */)
                            pos++;
                        args.push(text.substring(start, pos));
                    }
                }
                parseStrings(args);
            }