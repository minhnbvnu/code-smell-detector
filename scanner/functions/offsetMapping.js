function offsetMapping(mapping, offset) {
        return { line: offset.line + mapping.line, column: offset.column + mapping.column };
    }