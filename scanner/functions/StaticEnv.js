function StaticEnv(parent, type, frame) {
    this.parent = parent || null;
    this.type = type || GLOBAL_FRAME;
    this.frame = frame || new Dict();
    // cache the nearest enclosing script frame
    this.scriptFrame = this.isScriptFrame() ? this : parent.scriptFrame;
}