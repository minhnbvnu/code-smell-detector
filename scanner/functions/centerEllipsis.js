function centerEllipsis(str, length = 7) {
  return (str.length > (length * 2) + 1)
    ? `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}`
    : str
}