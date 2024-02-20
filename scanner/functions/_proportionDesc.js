function _proportionDesc(proportion) {
    return `[${_proportionBar(proportion)}] finished in ${_pad(Math.round(proportion*100), 2)}%`;
}