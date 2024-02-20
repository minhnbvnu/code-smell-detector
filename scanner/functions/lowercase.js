function lowercase (value) {
  return (value || value === 0)
    ? value.toString().toLowerCase()
    : ''
}