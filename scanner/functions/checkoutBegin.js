function checkoutBegin(state, sku) {
    return state.set('charge', Immutable.fromJS({
        sku: sku,
    }))
}