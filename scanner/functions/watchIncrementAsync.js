function* watchIncrementAsync() {
    while(true) {
        const action = yield take(INCREMENT_ASYNC)
        yield race([
            call(countdown, action),
            take(COUNTDOWN_TERMIMATED)
        ])
    }
}