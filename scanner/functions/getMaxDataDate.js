async function getMaxDataDate() {
    const year = pipe(map("year"), values, max)(pullRequests)
    const maxQuarter = pipe(
        filter({ year: year }),
        map("quarter"),
        values,
        max
    )(pullRequests)
    return { year: year, quarter: maxQuarter }
}