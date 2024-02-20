function reportAndStoreErrors(state, proj, errors) {
            reportErrors(state, errors);
            state.projectErrorsReported.set(proj, true);
            if (errors.length) {
                state.diagnostics.set(proj, errors);
            }
        }