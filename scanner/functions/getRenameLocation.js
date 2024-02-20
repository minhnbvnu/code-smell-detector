function getRenameLocation(edits, renameFilename, name, preferLastLocation) {
            let delta = 0;
            let lastPos = -1;
            for (const { fileName, textChanges: textChanges2 } of edits) {
                Debug.assert(fileName === renameFilename);
                for (const change of textChanges2) {
                    const { span, newText } = change;
                    const index = indexInTextChange(newText, escapeString(name));
                    if (index !== -1) {
                        lastPos = span.start + delta + index;
                        if (!preferLastLocation) {
                            return lastPos;
                        }
                    }
                    delta += newText.length - span.length;
                }
            }
            Debug.assert(preferLastLocation);
            Debug.assert(lastPos >= 0);
            return lastPos;
        }