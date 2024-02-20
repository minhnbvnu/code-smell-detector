function createSimpleDetails(name, kind, kind2) {
            return createCompletionDetails(name, "" /* none */, kind, [displayPart(name, kind2)]);
        }