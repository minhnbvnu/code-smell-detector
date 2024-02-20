function display (url, elem) {
  const li = document.createElement('li')
  const host = url.replace('http://', '').replace(':443', '').split('/')[0]
  li.appendChild(document.createTextNode(host))
  elem.appendChild(li)
}