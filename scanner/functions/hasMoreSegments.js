function hasMoreSegments(mappings, i) {
            if (i >= mappings.length)
                return false;
            const c = mappings.charCodeAt(i);
            if (c === comma || c === semicolon)
                return false;
            return true;
        }