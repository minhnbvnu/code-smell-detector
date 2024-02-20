function LexerAction(action) {
    this.actionType = action;
    this.isPositionDependent = false;
    return this;
}