function getA11yStatusMessage$1(_ref2){var isOpen=_ref2.isOpen,resultCount=_ref2.resultCount,previousResultCount=_ref2.previousResultCount;return isOpen?resultCount?resultCount!==previousResultCount?resultCount+" result"+(1===resultCount?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter key to select.":"":"No results are available.":""}