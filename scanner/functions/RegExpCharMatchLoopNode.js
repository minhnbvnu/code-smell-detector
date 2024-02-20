function RegExpCharMatchLoopNode (
    max,
    loopTransition,
    exitTransition
)
{
    this.max = max;
    this.times = 0;
    this.baseIndex = -1;
    this._final = false;

    this.loopTransition = loopTransition;
    this.exitTransition = exitTransition;

    this.nextTransition = loopTransition;
}