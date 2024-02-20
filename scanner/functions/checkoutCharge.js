function checkoutCharge(state, payload) {
    var needsShippingAddress = state.getIn([
        'schema',
        'products',
        payload.token.sku,
        'shippingAddress',
    ]) || state.getIn([
        'schema',
        'stripe',
        'shippingAddress',
    ])
    return state.withMutations(function (_state) {
        _state
            .setIn(['charge', 'email'], payload.token.email)
            .setIn(['charge', 'token'], payload.token.id)
        if (needsShippingAddress) {
            _.forEach(payload.addresses, function (val, key) {
                if (key.indexOf('shipping') < 0) return
                if (key === SHIPPING_COUNTRY_CODE) return
                if (key === SHIPPING_NAME_PREFIX) {
                    return _state.setIn([
                        'charge',
                        'shipping',
                        'name',
                    ], val)
                }
                var target = (key === SHIPPING_ZIP)
                    ? 'postal_code'
                    : key.replace(SHIPPING_ADDRESS_PREFIX, '')
                return _state.setIn([
                    'charge',
                    'shipping',
                    'address',
                    target,
                ], val)
            })
        }
        return _state
    })
}