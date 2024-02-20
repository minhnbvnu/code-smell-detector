function buildCommand(view, layer, extentsSource, extentsDestination, requester) {
    return {
        view,
        layer,
        extentsSource,
        extentsDestination,
        requester,
        priority: materialCommandQueuePriorityFunction(requester.material),
        earlyDropFunction: refinementCommandCancellationFn,
    };
}