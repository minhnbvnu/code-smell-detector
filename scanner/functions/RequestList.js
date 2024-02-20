function RequestList(input)
{
    this.input = input;
    this.pageTimings = [];

    // List of pageTimings fields (see HAR 1.2 spec) that should be displayed
    // in the waterfall graph as vertical lines. The HAR spec defines two timings:
    // onContentLoad: DOMContentLoad event fired
    // onLoad: load event fired
    // New custom page timing fields can be appended using RequestList.addPageTiming method.
    this.addPageTiming({
        name: "onContentLoad",
        classes: "netContentLoadBar",
        description: Strings.ContentLoad
    });

    this.addPageTiming({
        name: "onLoad",
        classes: "netWindowLoadBar",
        description: Strings.WindowLoad
    });

    InfoTip.addListener(this);
}