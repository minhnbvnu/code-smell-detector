function RegExpBackRefNonGreedyLoopNode (
    max,
    loopTransition,
    exitTransition
)
{
    this.max = max;
    this.times = 0;
    this._final = false;
    this.indexBacktrackStack = [];

    this.loopTransition = loopTransition;
    this.exitTransition = exitTransition;

    this.nextTransition = exitTransition;
}