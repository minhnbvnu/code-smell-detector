function encodeStringAsBlob(string) {
    let bytes = new TextEncoder().encode(string)
    let blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
    })
    return blob
}