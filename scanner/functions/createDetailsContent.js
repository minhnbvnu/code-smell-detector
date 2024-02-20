function createDetailsContent(origin, destination, message) {
  const content = document.createElement("div")
  content.classList.add("message-details-content")


  const oriTitle = createCell("Origin")
  const ori = document.createElement("span")
  ori.innerText = origin


  const destTitle = createCell("Destination")
  const dest = document.createElement("span")
  dest.innerText = destination

  const msgTitle = createCell("Message")
  const msg = document.createElement("span")
  msg.innerText = typeof message === "string" ? message : JSON.stringify(message, null, 2)


  content.appendChild(oriTitle)
  content.appendChild(ori)
  content.appendChild(destTitle)
  content.appendChild(dest)
  content.appendChild(msgTitle)
  content.appendChild(msg)
  return content
}