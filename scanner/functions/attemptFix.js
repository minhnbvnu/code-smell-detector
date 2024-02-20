function attemptFix(problem) {
            const fix = problem.fix;
            const start = fix.range[0];
            const end = fix.range[1];
            // Remain it as a problem if it's overlapped or it's a negative range
            if (lastPos >= start || start > end) {
                remainingMessages.push(problem);
                return false;
            }
            // Remove BOM.
            if ((start < 0 && end >= 0) || (start === 0 && fix.text.startsWith(BOM))) {
                output = "";
            }
            // Make output to this fix.
            output += text.slice(Math.max(0, lastPos), Math.max(0, start));
            output += fix.text;
            lastPos = end;
            return true;
        }