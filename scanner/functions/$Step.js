function $Step(last, startCost, goalCost) {
    this.last          = last;
    this.previous      = null;
    this.costFromStart = startCost;
    this.costToGoal    = goalCost;
    this.inQueue       = true;
}