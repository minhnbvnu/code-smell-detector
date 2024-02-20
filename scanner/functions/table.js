function table(data, targetDiv) {
  var templateID = targetDiv.replace("#", "")
  var tableContents = ich[templateID]({
    rows: data
  })
  $(targetDiv).html(tableContents)
}