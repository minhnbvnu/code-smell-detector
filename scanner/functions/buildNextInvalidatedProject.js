function buildNextInvalidatedProject(state, changeDetected) {
            mark("SolutionBuilder::beforeBuild");
            const buildOrder = buildNextInvalidatedProjectWorker(state, changeDetected);
            mark("SolutionBuilder::afterBuild");
            measure("SolutionBuilder::Build", "SolutionBuilder::beforeBuild", "SolutionBuilder::afterBuild");
            if (buildOrder)
                reportErrorSummary(state, buildOrder);
        }