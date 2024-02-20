function getSizeBetweenIcon(rootObjectSize, size) {
  const value = parseInt(size)
  const unit = size.replace(value, '')
  return (unit && unit === '%') ? rootObjectSize + rootObjectSize * (value / 100) : rootObjectSize + value;
}