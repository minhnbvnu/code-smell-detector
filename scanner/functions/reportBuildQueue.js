function reportBuildQueue(state, buildQueue) {
            if (state.options.verbose) {
                reportStatus(state, Diagnostics.Projects_in_this_build_Colon_0, buildQueue.map((s) => "\r\n    * " + relName(state, s)).join(""));
            }
        }