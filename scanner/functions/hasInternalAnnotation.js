function hasInternalAnnotation(range, currentSourceFile) {
            const comment = currentSourceFile.text.substring(range.pos, range.end);
            return stringContains(comment, "@internal");
        }