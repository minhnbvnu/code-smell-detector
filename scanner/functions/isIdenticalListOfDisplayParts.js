function isIdenticalListOfDisplayParts(parts1, parts2) {
            return arraysEqual(parts1, parts2, (p1, p2) => p1.kind === p2.kind && p1.text === p2.text);
        }