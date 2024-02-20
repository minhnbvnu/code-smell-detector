function* enumeratePropertyNames(trackMap, path = []) {
    for (const key of Object.keys(trackMap)) {
        const value = trackMap[key]
        if (typeof value !== "object") {
            continue
        }

        path.push(key)

        if (value[CALL]) {
            yield `${path.join(".")}()`
        }
        if (value[CONSTRUCT]) {
            yield `new ${path.join(".")}()`
        }
        if (value[READ]) {
            yield path.join(".")
        }
        yield* enumeratePropertyNames(value, path)

        path.pop()
    }
}