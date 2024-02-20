function addReplacementSpans(text, textStart, names) {
            const span = getDirectoryFragmentTextSpan(text, textStart);
            const wholeSpan = text.length === 0 ? void 0 : createTextSpan(textStart, text.length);
            return names.map(({ name, kind, extension }) => Math.max(name.indexOf(directorySeparator), name.indexOf(altDirectorySeparator)) !== -1 ? { name, kind, extension, span: wholeSpan } : { name, kind, extension, span });
        }