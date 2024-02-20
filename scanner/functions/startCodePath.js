function startCodePath(origin) {
            if (codePath) {
                // Emits onCodePathSegmentStart events if updated.
                forwardCurrentToHead(analyzer, node);
                debug.dumpState(node, state, false);
            }
            // Create the code path of this scope.
            codePath = analyzer.codePath = new CodePath({
                id: analyzer.idGenerator.next(),
                origin,
                upper: codePath,
                onLooped: analyzer.onLooped
            });
            state = CodePath.getState(codePath);
            // Emits onCodePathStart events.
            debug.dump(`onCodePathStart ${codePath.id}`);
            analyzer.emitter.emit("onCodePathStart", codePath, node);
        }