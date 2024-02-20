function assertThatCircuitUpdateActsLikeMatrix(updateAction, matrix, repeats=5, forcedTime=undefined) {
    for (let i = 0; i < repeats; i++) {
        assertThatCircuitMutationActsLikeMatrix_single(updateAction, matrix, forcedTime);
    }
}