function DefaultErrorStrategy() {
	ErrorStrategy.call(this);
    // Indicates whether the error strategy is currently "recovering from an
    // error". This is used to suppress reporting multiple error messages while
    // attempting to recover from a detected syntax error.
    //
    // @see //inErrorRecoveryMode
    //
    this.errorRecoveryMode = false;

    // The index into the input stream where the last error occurred.
    // This is used to prevent infinite loops where an error is found
    // but no token is consumed during recovery...another error is found,
    // ad nauseum. This is a failsafe mechanism to guarantee that at least
    // one token/tree node is consumed for two errors.
    //
    this.lastErrorIndex = -1;
    this.lastErrorStates = null;
    return this;
}