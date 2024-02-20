function leaveFromCurrentSegment(analyzer, node) {
        const state = CodePath.getState(analyzer.codePath);
        const currentSegments = state.currentSegments;
        for (let i = 0; i < currentSegments.length; ++i) {
            const currentSegment = currentSegments[i];
            debug.dump(`onCodePathSegmentEnd ${currentSegment.id}`);
            if (currentSegment.reachable) {
                analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
            }
        }
        state.currentSegments = [];
    }