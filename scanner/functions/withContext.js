function withContext(enclosingDeclaration, flags, tracker, cb) {
                    Debug.assert(enclosingDeclaration === void 0 || (enclosingDeclaration.flags & 8 /* Synthesized */) === 0);
                    const moduleResolverHost = (tracker == null ? void 0 : tracker.trackSymbol) ? tracker.moduleResolverHost : flags & 134217728 /* DoNotIncludeSymbolChain */ ? createBasicNodeBuilderModuleSpecifierResolutionHost(host) : void 0;
                    const context = {
                        enclosingDeclaration,
                        flags: flags || 0 /* None */,
                        tracker: void 0,
                        encounteredError: false,
                        reportedDiagnostic: false,
                        visitedTypes: void 0,
                        symbolDepth: void 0,
                        inferTypeParameters: void 0,
                        approximateLength: 0
                    };
                    context.tracker = new SymbolTrackerImpl(context, tracker, moduleResolverHost);
                    const resultingNode = cb(context);
                    if (context.truncating && context.flags & 1 /* NoTruncation */) {
                        context.tracker.reportTruncationError();
                    }
                    return context.encounteredError ? void 0 : resultingNode;
                }