function extension_hue(extension) {
    if (!EXTENSION_MAP.has(extension)) {
        if (extension === null || extension === undefined) {
            EXTENSION_MAP.set(extension, null)
        } else {
            const bytes = Uint8Array.from(extension.split("").map(c => c.charCodeAt(0)))
            let hue = 0
            bytes.forEach((b, index) => {
                hue += ((((b%26)+7)%26)+1) * (360/27) / (27**index)
            })
            EXTENSION_MAP.set(extension, hue)
        }
    }
    return EXTENSION_MAP.get(extension)
}