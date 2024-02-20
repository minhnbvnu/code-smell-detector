function shortenTitle (title) {
    if (title.length > 18) return title.substr(0, 18) + '…'
    else return title
}