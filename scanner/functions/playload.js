function playload(e) {
    return function(e) {
        return function(t) {
            return e({
                type: "INIT",
                payload: kt(t)
            })
        }
    }
}