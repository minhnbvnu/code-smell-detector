function initClear(revision, obsIsAnyOverlayShowing) {
    const EMPTY_STATE = '{"cols":[]}';

    const clearAllButton = /** @type {!HTMLButtonElement} */ document.getElementById('clear-all-button');
    revision.latestActiveCommit().zipLatest(obsIsAnyOverlayShowing, (r, v) => ({r, v})).subscribe(({r, v}) => {
        clearAllButton.disabled = r === EMPTY_STATE || v;
    });
    clearAllButton.addEventListener('click', () => revision.commit(EMPTY_STATE));

    const clearCircuitButton = /** @type {!HTMLButtonElement} */ document.getElementById('clear-circuit-button');
    revision.latestActiveCommit().zipLatest(obsIsAnyOverlayShowing, (r, v) => ({r, v})).subscribe(({r, v}) => {
        clearCircuitButton.disabled = r === _getEmptyCircuitState(revision) || v;
    });
    clearCircuitButton.addEventListener('click', () => revision.commit(_getEmptyCircuitState(revision)));
}