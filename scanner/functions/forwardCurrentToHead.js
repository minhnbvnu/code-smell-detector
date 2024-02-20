function forwardCurrentToHead(analyzer, node) {
        const codePath = analyzer.codePath;
        const state = CodePath.getState(codePath);
        const currentSegments = state.currentSegments;
        const headSegments = state.headSegments;
        const end = Math.max(currentSegments.length, headSegments.length);
        let i, currentSegment, headSegment;
        // Fires leaving events.
        for (i = 0; i < end; ++i) {
            currentSegment = currentSegments[i];
            headSegment = headSegments[i];
            if (currentSegment !== headSegment && currentSegment) {
                debug.dump(`onCodePathSegmentEnd ${currentSegment.id}`);
                if (currentSegment.reachable) {
                    analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
                }
            }
        }
        // Update state.
        state.currentSegments = headSegments;
        // Fires entering events.
        for (i = 0; i < end; ++i) {
            currentSegment = currentSegments[i];
            headSegment = headSegments[i];
            if (currentSegment !== headSegment && headSegment) {
                debug.dump(`onCodePathSegmentStart ${headSegment.id}`);
                CodePathSegment.markUsed(headSegment);
                if (headSegment.reachable) {
                    analyzer.emitter.emit("onCodePathSegmentStart", headSegment, node);
                }
            }
        }
    }