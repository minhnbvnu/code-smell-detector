function constructChart(data, title, top) {
        if (data.length === dataLength && _.size(top) === 0) {
            return
        }

        dataLength = data.length
        const newState = {
            ...state,
            yAxis: {
                ...state.yAxis,
                title: { text: isMobile ? "" : title },
            },
            series: createSeriesPercentage(data, top),
            xAxis: { tickLength: 0, categories: categories() },
        }
        updateState(newState)
    }