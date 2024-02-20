function sanityCheck(subject) {
    if (subject instanceof Map) {
        for (let k in subject) {
            if (subject.hasOwnProperty(k)) {
                throw new Error(`Map has property 'map[${k}]' instead of entry 'map.get(${k})'. Probably a mistake.`)
            }
        }
    }
}