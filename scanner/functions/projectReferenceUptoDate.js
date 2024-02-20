function projectReferenceUptoDate(oldRef, newRef, index) {
                return projectReferenceIsEqualTo(oldRef, newRef) && resolvedProjectReferenceUptoDate(program.getResolvedProjectReferences()[index], oldRef);
            }