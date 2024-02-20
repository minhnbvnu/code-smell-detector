function createRow(origin, dest, msg, time) {
  const details = document.createElement("details")
  const summary = document.createElement("summary")

  details.open = false
  summary.classList.add("row")
  summary.appendChild(createCell(""))
  summary.appendChild(createCell(stripProtocol(origin)))
  summary.appendChild(createCell(stripProtocol(dest)))
  summary.appendChild(createCell(typeof msg === "string" ? msg : JSON.stringify(msg)))
  summary.appendChild(createCell(time))
  details.appendChild(summary)
  details.appendChild(createDetailsContent(origin, dest, msg))
  return details
}