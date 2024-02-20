function addSplit(screenPos) {
            var len = screenPos - lastSplit;
            for (var i = lastSplit; i < screenPos; i++) {
                var ch = tokens[i];
                if (ch === 12 || ch === 2) len -= 1;
            }

            if (!splits.length) {
                indent = getWrapIndent();
                splits.indent = indent;
            }
            lastDocSplit += len;
            splits.push(lastDocSplit);
            lastSplit = screenPos;
        }