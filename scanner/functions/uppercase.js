function uppercase (value) {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
}