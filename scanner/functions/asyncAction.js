function* asyncAction({ ms }) {
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
    let payload = yield promise
    yield put({
        type: actionTypes.UPDATE_DATA,
        payload: payload
    })
}