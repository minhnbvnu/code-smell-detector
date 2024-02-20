function handleOpenWebsite(e) {
  e.preventDefault()
  fetch(e.target.href)
}