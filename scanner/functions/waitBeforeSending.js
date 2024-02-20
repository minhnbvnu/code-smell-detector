async function waitBeforeSending(exactMatch, PartialMatch) {
    if (exactMatch || PartialMatch) {
        if ((exactMatch || PartialMatch).afterSeconds) {
            await delay((exactMatch || PartialMatch).afterSeconds * 1000)
        }
    }
}