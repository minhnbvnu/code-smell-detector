function compareMessagesByLocation(a, b) {
        return a.line - b.line || a.column - b.column;
    }