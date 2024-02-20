function getOrCreateStore(initialState) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return configureStore(initialState)
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = configureStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}