function RegExpLookaheadNode (
    group,
    positive,
    lookaheadTransition,
    exitTransition
)
{
    this.contextIndex = -1;
    this.group = group;
    this.positive = positive;
    this.lookaheadTransition = lookaheadTransition;
    this.exitTransition = exitTransition;
    this.reset();
}