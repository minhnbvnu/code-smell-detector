function whenReady(tag, cb){
    customElements.whenDefined(tag).then(() => {
        var el = document.querySelector(tag)
        cb(el)
    })
}