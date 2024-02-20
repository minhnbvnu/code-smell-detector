function bindSourceFile2(f, opts) {
                var _a2, _b;
                file = f;
                options = opts;
                languageVersion = getEmitScriptTarget(options);
                inStrictMode = bindInStrictMode(file, opts);
                classifiableNames = /* @__PURE__ */ new Set();
                symbolCount = 0;
                Symbol46 = objectAllocator.getSymbolConstructor();
                Debug.attachFlowNodeDebugInfo(unreachableFlow);
                Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);
                if (!file.locals) {
                    (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, 
                    /*separateBeginAndEnd*/
                    true);
                    bind(file);
                    (_b = tracing) == null ? void 0 : _b.pop();
                    file.symbolCount = symbolCount;
                    file.classifiableNames = classifiableNames;
                    delayedBindJSDocTypedefTag();
                }
                file = void 0;
                options = void 0;
                languageVersion = void 0;
                parent2 = void 0;
                container = void 0;
                thisParentContainer = void 0;
                blockScopeContainer = void 0;
                lastContainer = void 0;
                delayedTypeAliases = void 0;
                seenThisKeyword = false;
                currentFlow = void 0;
                currentBreakTarget = void 0;
                currentContinueTarget = void 0;
                currentReturnTarget = void 0;
                currentTrueTarget = void 0;
                currentFalseTarget = void 0;
                currentExceptionTarget = void 0;
                activeLabelList = void 0;
                hasExplicitReturn = false;
                inAssignmentPattern = false;
                emitFlags = 0 /* None */;
            }