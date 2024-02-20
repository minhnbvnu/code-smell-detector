function percentFormatter(cell, row) {
        const font = (i, color) =>
            `<font size="1">(<font color="${color}">${i}%</font>)</font>`
        const colorize = (i) =>
            i >= 0 ? font("+" + i, "green") : font(i, "chrimson")
        const percent = (i) => (i * 100).toFixed(3)
        const countPercent = (percent(row.count)) + "%"
        // NaN can happen in case of new first seen languages,
        // hence we say 0% change
        const normalize = (n) => (_.isNaN(n) ? 0.0 : n)
        const offset = "\u00A0".repeat(6)
        return (
            offset +
            (row.id > 30
                ? countPercent
                : `${
                      countPercent +
                      ("  " + (_.pipe(normalize, percent, colorize)(row.change)))
                  }`)
        )
    }