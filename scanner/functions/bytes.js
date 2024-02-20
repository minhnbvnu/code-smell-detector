function bytes(value, decimals) {
    const globalOptions = (this && this.bytes) ? this.bytes : {}
    decimals = util.exist(decimals) ? decimals : globalOptions.decimalDigits
    decimals = (typeof decimals !== 'undefined') ? decimals : 2
    value = value === null || isNaN(value) ? 0 : value
    
    if (value >= Math.pow(1024, 4)) {
        // TB
        return `${(value / Math.pow(1024, 4)).toFixed(decimals)} TB`
    } else if (value >= Math.pow(1024, 3)) {
        // GB
        return `${(value / Math.pow(1024, 3)).toFixed(decimals)} GB`
    } else if (value >= Math.pow(1024, 2)) {
        // MB
        return `${(value / Math.pow(1024, 2)).toFixed(decimals)} MB`
    } else if (value >= 1024) {
        // kb
        return `${(value / 1024).toFixed(decimals)} kB`
    }
    // byte
    return value === 1 ? `${value} byte` : `${value} bytes`
}