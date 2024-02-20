function StaticContext(parentScript, parentBlock, inModule, inFunction, strictMode) {
    this.parentScript = parentScript;
    this.parentBlock = parentBlock || parentScript;
    this.inModule = inModule || false;
    this.inFunction = inFunction || false;
    this.inForLoopInit = false;
    this.topLevel = true;
    this.allLabels = new Stack();
    this.currentLabels = new Stack();
    this.labeledTargets = new Stack();
    this.defaultLoopTarget = null;
    this.defaultTarget = null;
    this.strictMode = strictMode;
}