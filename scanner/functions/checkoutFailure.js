function checkoutFailure(state, err) {
    var error = _.includes(_.pluck(ERRORS, 'id'), err) ? err : ERRORS.chargeFailed.id
    return module.exports().merge({
        error: error,
        schema: state.get('schema'),
    })
}