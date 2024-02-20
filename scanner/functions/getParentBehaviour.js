function getParentBehaviour(stubInstance) {
    return stubInstance.parent && getCurrentBehavior(stubInstance.parent);
}