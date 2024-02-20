function getStripeCheckout() {
    return (typeof StripeCheckout === 'object')
        ? StripeCheckout
        : {
            configure: function () {
                return {
                    open: _.noop,
                }
            },
        }
}