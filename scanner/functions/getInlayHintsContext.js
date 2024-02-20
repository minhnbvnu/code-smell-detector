function getInlayHintsContext(file, span, preferences) {
                return {
                    file,
                    program: getProgram(),
                    host,
                    span,
                    preferences,
                    cancellationToken
                };
            }