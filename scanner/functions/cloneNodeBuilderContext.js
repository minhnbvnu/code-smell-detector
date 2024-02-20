function cloneNodeBuilderContext(context) {
                    const initial = { ...context };
                    if (initial.typeParameterNames) {
                        initial.typeParameterNames = new Map(initial.typeParameterNames);
                    }
                    if (initial.typeParameterNamesByText) {
                        initial.typeParameterNamesByText = new Set(initial.typeParameterNamesByText);
                    }
                    if (initial.typeParameterSymbolList) {
                        initial.typeParameterSymbolList = new Set(initial.typeParameterSymbolList);
                    }
                    initial.tracker = new SymbolTrackerImpl(initial, initial.tracker.inner, initial.tracker.moduleResolverHost);
                    return initial;
                }