function getDefaultBehavior(stubInstance) {
    return stubInstance.defaultBehavior || getParentBehaviour(stubInstance) || behavior.create(stubInstance);
}