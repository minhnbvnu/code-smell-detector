function UndoManagerProxy(undoManager, session) {
    this.$u = undoManager;
    this.$doc = session;
}