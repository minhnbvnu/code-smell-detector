function getEditsForRefactor(context, refactorName13, actionName2) {
            const refactor = refactors.get(refactorName13);
            return refactor && refactor.getEditsForAction(context, actionName2);
        }