function _getEmptyCircuitState(revision) {
    let val = JSON.parse(revision.peekActiveCommit());
    val["cols"] = [];

    return JSON.stringify(val);
}