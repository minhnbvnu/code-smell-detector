function trendFormatter(cell, _) {
        const arrow = (n) => {
            const angle = (dir) => `<i class='fas fa-angle-${dir}'></i>`
            switch (true) {
                case n === 0:
                    return ""
                case n > 3:
                    return angle("double-up")
                case n < -3:
                    return angle("double-down")
                case n < 0:
                    return angle("down")
                case n > 0:
                    return angle("up")
                default:
                    // direct jump to top 50 and previously unkown
                    return angle("double-up")
            }
        }
        return `${arrow(cell)}`
    }