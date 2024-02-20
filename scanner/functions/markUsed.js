function markUsed(line) {
                if (!directivesByLine.has(`${line}`)) {
                    return false;
                }
                usedLines.set(`${line}`, true);
                return true;
            }