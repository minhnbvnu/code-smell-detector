function assertThat(subject, extraArgCatcher) {
    if (extraArgCatcher !== undefined) {
        fail('Extra assertThat arg');
    }
    return new AssertionSubject(subject, 'assertThat #' + assertionSubjectIndexForNextTest);
}