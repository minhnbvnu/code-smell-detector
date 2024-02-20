function toReplaceMessage(replacedBy, version) {
    let message = replacedBy

    if (Array.isArray(replacedBy)) {
        message = replacedBy
            .filter(
                ({ supported }) =>
                    !version.intersects(getSemverRange(`<${supported}`))
            )
            .map(({ name }) => name)
            .join(" or ")
    }

    return message ? `. Use ${message} instead` : ""
}