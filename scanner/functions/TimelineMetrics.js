function TimelineMetrics() {
    this.timelineMetrics = {};
    this.runtimePerfMetrics = new RuntimePerfMetrics();
    this.eventStacks = {};

    BaseMetrics.apply(this, arguments);
}