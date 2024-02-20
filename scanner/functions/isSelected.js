function isSelected (item, selectedItems) {
  if (!item || !selectedItems.length) return false
  return selectedItems.some(val => val.key === item.key)
}