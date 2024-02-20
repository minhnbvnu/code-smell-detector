function mountTable() {

        const data = store[0].data
        const { year, quarter } = hist[0]
        const dec = (i) => _.toString(--i)

        const curYearRanking = createTable(data, year, quarter)
        const lastYearRanking = createTable(data, dec(year), quarter)
        const trendRanking = getTrend(curYearRanking, lastYearRanking)
        const langRanking = getChange(trendRanking, lastYearRanking)

        if (!_.isEqual(state.data, langRanking)) {
            const [, dispatch] = table
            dispatch({ type: "set", payload: langRanking })
            setState({ data: langRanking })
        }
    }