function formatString (dateString) {
  let dateTemp = ''

  dateTemp += `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)} ${dateString.slice(8, 10)}:${dateString.slice(10, 12)}:${dateString.slice(12)}`

  dateTemp = dateTemp.replace(new RegExp('-', 'gm'), '/')
  const dateTempHaoMiao = (new Date(dateTemp)).getTime()
  return dateTempHaoMiao
}