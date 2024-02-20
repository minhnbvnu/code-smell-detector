function* fecthData() {
    yield takeEvery(actionTypes.FETCH_START, fetchNewsTitle)
}