function webSQLErrback (webSQLErr) {
    let name, message;
    switch (webSQLErr.code) {
    case 4: { // SQLError.QUOTA_ERR
        name = 'QuotaExceededError';
        message = 'The operation failed because there was not enough ' +
            'remaining storage space, or the storage quota was reached ' +
            'and the user declined to give more space to the database.';
        break;
    }
    /*
    // Should a WebSQL timeout treat as IndexedDB `TransactionInactiveError` or `UnknownError`?
    case 7: { // SQLError.TIMEOUT_ERR
        // All transaction errors abort later, so no need to mark inactive
        name = 'TransactionInactiveError';
        message = 'A request was placed against a transaction which is currently not active, or which is finished (Internal SQL Timeout).';
        break;
    }
    */
    default: {
        name = 'UnknownError';
        message = 'The operation failed for reasons unrelated to the database itself and not covered by any other errors.';
        break;
    }
    }
    message += ' (' + webSQLErr.message + ')--(' + webSQLErr.code + ')';
    const err =
        /**
         * @type {(Error | DOMException) & {
         *   sqlError: SQLError
         * }}
         */
        (createDOMException(name, message));
    err.sqlError = webSQLErr;
    return err;
}