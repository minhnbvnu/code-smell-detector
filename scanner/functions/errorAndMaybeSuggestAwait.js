function errorAndMaybeSuggestAwait(location, maybeMissingAwait, message, arg0, arg1, arg2, arg3) {
                const diagnostic = error(location, message, arg0, arg1, arg2, arg3);
                if (maybeMissingAwait) {
                    const related = createDiagnosticForNode(location, Diagnostics.Did_you_forget_to_use_await);
                    addRelatedInfo(diagnostic, related);
                }
                return diagnostic;
            }