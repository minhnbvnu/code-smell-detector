function runAsync(time) {
    return new Promise(function(resolve, reject) {
        const timer = setTimeout(function() {
            resolve()
            clearTimeout(timer)
        }, time)
    })
}