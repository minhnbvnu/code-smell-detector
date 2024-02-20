function RegExpGroupNode (
    group
)
{
    this.group = group;
    this.nextPath = 0;
    this.transitions = [];
    this.groupBacktrackStack = [];
    this.contextIndex = -1;
    this._final = false;
}