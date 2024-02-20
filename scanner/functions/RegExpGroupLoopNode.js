function RegExpGroupLoopNode (
    max,
    loopTransition,
    exitTransition
)
{
    this.max = max;
    this.times = 0;
    this._final = false;
    this.contextIndex = -1;

    this.loopTransition = loopTransition;
    this.exitTransition = exitTransition;

    this.nextTransition = loopTransition;
}