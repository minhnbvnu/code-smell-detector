function buildErrorMessage(e) {
        return e.line !== undefined && e.column !== undefined
            ? 'Line ' + e.line + ', column ' + e.column + ': ' + e.message
            : e.message;
    }