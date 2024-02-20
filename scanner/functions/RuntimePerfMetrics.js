function RuntimePerfMetrics() {
    this.paintArea = new StatData();
    this.nodesPerLayout = new StatData();
    this.DirtyNodesPerLayout = new StatData();
    this.layers = {};
    this.expensivePaints = 0;
    this.expensiveEventHandlers = 0;
    this.styles = 0;

    this.hasData = false;
    this.eventDispatchFn = null; // To check if FunctionCall follows EventDispatch events

    this.frames = [];
}