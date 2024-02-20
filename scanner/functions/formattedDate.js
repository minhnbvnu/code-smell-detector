function formattedDate( date ) {
  return date.getFullYear() + '-' + monthNames[date.getMonth()] + '-' + date.getDate()
}