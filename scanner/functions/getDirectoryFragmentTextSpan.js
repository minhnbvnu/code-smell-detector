function getDirectoryFragmentTextSpan(text, textStart) {
            const index = Math.max(text.lastIndexOf(directorySeparator), text.lastIndexOf(altDirectorySeparator));
            const offset = index !== -1 ? index + 1 : 0;
            const length2 = text.length - offset;
            return length2 === 0 || isIdentifierText(text.substr(offset, length2), 99 /* ESNext */) ? void 0 : createTextSpan(textStart + offset, length2);
        }