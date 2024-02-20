function endCodePath() {
            let codePath = analyzer.codePath;
            // Mark the current path as the final node.
            CodePath.getState(codePath).makeFinal();
            // Emits onCodePathSegmentEnd event of the current segments.
            leaveFromCurrentSegment(analyzer, node);
            // Emits onCodePathEnd event of this code path.
            debug.dump(`onCodePathEnd ${codePath.id}`);
            analyzer.emitter.emit("onCodePathEnd", codePath, node);
            debug.dumpDot(codePath);
            codePath = analyzer.codePath = analyzer.codePath.upper;
            if (codePath) {
                debug.dumpState(node, CodePath.getState(codePath), true);
            }
        }