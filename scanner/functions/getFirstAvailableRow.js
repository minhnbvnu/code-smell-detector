function getFirstAvailableRow( table ) {
  var row = table.find('tr.days').filter(function(i, thisRow) {
    return ($(thisRow).find('td').length) < 7
  })
  // If no available row, create a new one
  if( row.length == 0 ) {
    table.append('<tr class=days>')
    var row = table.find('tr').last()
  }
  return row
}