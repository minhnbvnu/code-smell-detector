function formatCoverageItem (coverage, itemName) {
  return (coverage['covered' + itemName] / coverage[itemName] * 100).toFixed(2).padStart(5 - itemName.length + 12) + '%'
}