function createBuildOrder(state, roots) {
            const temporaryMarks = /* @__PURE__ */ new Map();
            const permanentMarks = /* @__PURE__ */ new Map();
            const circularityReportStack = [];
            let buildOrder;
            let circularDiagnostics;
            for (const root of roots) {
                visit(root);
            }
            return circularDiagnostics ? { buildOrder: buildOrder || emptyArray, circularDiagnostics } : buildOrder || emptyArray;
            function visit(configFileName, inCircularContext) {
                const projPath = toResolvedConfigFilePath(state, configFileName);
                if (permanentMarks.has(projPath))
                    return;
                if (temporaryMarks.has(projPath)) {
                    if (!inCircularContext) {
                        (circularDiagnostics || (circularDiagnostics = [])).push(createCompilerDiagnostic(Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0, circularityReportStack.join("\r\n")));
                    }
                    return;
                }
                temporaryMarks.set(projPath, true);
                circularityReportStack.push(configFileName);
                const parsed = parseConfigFile(state, configFileName, projPath);
                if (parsed && parsed.projectReferences) {
                    for (const ref of parsed.projectReferences) {
                        const resolvedRefPath = resolveProjectName(state, ref.path);
                        visit(resolvedRefPath, inCircularContext || ref.circular);
                    }
                }
                circularityReportStack.pop();
                permanentMarks.set(projPath, true);
                (buildOrder || (buildOrder = [])).push(configFileName);
            }
        }