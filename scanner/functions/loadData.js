function loadData({ resolve, reject, promiseState, cacheId, onStartCallback, url, headers, slowItDown }) {
    onStartCallback(promiseState, cacheId);

    oboe({ url, headers })
        .node('slices.*', (data) => {
            slowItDown.doIt(() => {
                promiseState.completePartialLoad(data);
            });
        })
        .done((data) => {
            if (data && data.reason === undefined) {
                slowItDown.doIt(() => {
                    promiseState.succeedLoad(data);

                    resolve(promiseState);
                });
            }
        })
        .fail((error) => {
            slowItDown.doIt(() => {
                promiseState.failLoad(error);

                reject(promiseState);
            });
        })
    ;
}